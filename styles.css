const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

loadEnvFile(path.join(__dirname, '.env'));

const PORT = Number(process.env.PORT || 3000);
const ROOT = __dirname;
const DATA_DIR = path.join(ROOT, 'data');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8'
};

const server = http.createServer(async (req, res) => {
  setCors(res);
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  try {
    if (req.method === 'GET' && url.pathname === '/api/health') {
      return json(res, 200, {
        ok: true,
        app: 'AstraX Bharat AI',
        time: new Date().toISOString(),
        openRouterConfigured: Boolean(process.env.ASTRA_AI_API_KEY),
        serperConfigured: Boolean(process.env.ASTRA_SERPER_API_KEY)
      });
    }

    if (req.method === 'GET' && url.pathname === '/api/resources') {
      return json(res, 200, { resources: readJson('official-resources.json', {}) });
    }

    if (req.method === 'GET' && url.pathname === '/api/opportunities') {
      const items = mergeOpportunityData();
      return json(res, 200, { generatedAt: new Date().toISOString(), items });
    }

    if (req.method === 'POST' && url.pathname === '/api/opportunities-refresh') {
      const items = await buildOpportunityFeed();
      fs.writeFileSync(path.join(DATA_DIR, 'generated-opportunities.json'), JSON.stringify(items, null, 2));
      return json(res, 200, { ok: true, count: items.length, items });
    }

    if (req.method === 'POST' && url.pathname === '/api/search') {
      const body = await readBody(req);
      const query = String(body.query || '').trim();
      if (!query) return json(res, 400, { error: 'Missing query' });
      const results = await searchWeb(query);
      return json(res, 200, { query, results });
    }

    if (req.method === 'POST' && url.pathname === '/api/chat') {
      const body = await readBody(req);
      const message = String(body.message || '').trim();
      if (!message) return json(res, 400, { error: 'Missing message' });

      const useWebSearch = Boolean(body.useWebSearch);
      const language = String(body.language || 'en-IN');
      const mode = String(body.mode || 'general');
      const psychologyAware = body.psychologyAware !== false;
      const history = Array.isArray(body.history) ? body.history.slice(-10) : [];

      let sources = [];
      if (useWebSearch) {
        sources = await searchWeb(message);
      }

      const aiConfigured = process.env.ASTRA_AI_BASE_URL && process.env.ASTRA_AI_MODEL && process.env.ASTRA_AI_API_KEY;
      const reply = aiConfigured
        ? await askRemoteModel({ message, history, language, mode, psychologyAware, sources })
        : generateOfflineReply({ message, language, mode, psychologyAware, sources });

      return json(res, 200, { reply, sources });
    }

    if (req.method === 'POST' && url.pathname === '/api/image-edit') {
      return json(res, 501, {
        error: 'Image edit proxy not configured.',
        hint: 'Set image provider env vars and implement provider-specific logic in server.js.'
      });
    }

    if (req.method === 'POST' && url.pathname === '/api/tts') {
      return json(res, 501, {
        error: 'TTS proxy not configured.',
        hint: 'Connect a licensed TTS provider in backend env and extend server.js.'
      });
    }

    if (req.method === 'GET') {
      return serveStatic(res, url.pathname);
    }

    json(res, 404, { error: 'Not found' });
  } catch (error) {
    json(res, 500, { error: error.message || 'Server error' });
  }
});

server.listen(PORT, () => {
  console.log(`AstraX Bharat AI running on http://localhost:${PORT}`);
});

function loadEnvFile(filePath) {
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    raw.split(/\r?\n/).forEach((line) => {
      if (!line || /^\s*#/.test(line)) return;
      const match = line.match(/^\s*([A-Za-z0-9_]+)\s*=\s*(.*)\s*$/);
      if (!match) return;
      const key = match[1];
      let value = match[2];
      value = value.replace(/^['"]|['"]$/g, '');
      if (!(key in process.env)) process.env[key] = value;
    });
  } catch {
    // ignore missing .env
  }
}

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

function json(res, status, payload) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(payload, null, 2));
}

function readJson(fileName, fallback) {
  try {
    const raw = fs.readFileSync(path.join(DATA_DIR, fileName), 'utf8');
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function mergeOpportunityData() {
  const seed = readJson('opportunities.json', []);
  const generated = readJson('generated-opportunities.json', []);
  return dedupeBy([...seed, ...generated], (item) => `${item.title}|${item.link}`);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (chunk) => {
      raw += chunk;
      if (raw.length > 2_000_000) {
        reject(new Error('Request body too large'));
        req.destroy();
      }
    });
    req.on('end', () => {
      if (!raw) return resolve({});
      try {
        resolve(JSON.parse(raw));
      } catch {
        reject(new Error('Invalid JSON body'));
      }
    });
    req.on('error', reject);
  });
}

function serveStatic(res, pathname) {
  let filePath = pathname === '/' ? '/index.html' : decodeURIComponent(pathname);
  const safePath = path.normalize(filePath).replace(/^([.][.][/\\])+/, '');
  const fullPath = path.join(ROOT, safePath);

  if (!fullPath.startsWith(ROOT)) return json(res, 403, { error: 'Forbidden' });

  fs.stat(fullPath, (err, stat) => {
    if (err || !stat.isFile()) {
      const fallback = path.join(ROOT, 'index.html');
      return fs.readFile(fallback, (fallbackErr, content) => {
        if (fallbackErr) return json(res, 404, { error: 'Not found' });
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(content);
      });
    }

    const ext = path.extname(fullPath).toLowerCase();
    const contentType = MIME[ext] || 'application/octet-stream';
    fs.readFile(fullPath, (readErr, content) => {
      if (readErr) return json(res, 500, { error: 'Failed to read file' });
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    });
  });
}

async function askRemoteModel({ message, history, language, mode, psychologyAware, sources }) {
  const endpoint = normalizeChatEndpoint(process.env.ASTRA_AI_BASE_URL);
  const currentLang = languageLabel(language);
  const modeLabel = modeName(mode);
  const sourceContext = sources.length
    ? sources.map((item, index) => `${index + 1}. ${item.title}\n${item.url}\n${item.snippet || ''}`).join('\n\n')
    : '';

  const payload = {
    model: process.env.ASTRA_AI_MODEL,
    temperature: 0.45,
    messages: [
      {
        role: 'system',
        content: `You are AstraX Bharat AI, a helpful India-first personal assistant. Reply in ${currentLang} unless user asks otherwise. Mode: ${modeLabel}. Be clear, practical, safe, and refuse illegal or pirated requests. ${psychologyAware ? 'Be empathetic and psychologically aware without pretending to be a clinician.' : ''}`
      },
      ...(sourceContext ? [{ role: 'system', content: `Web/official sources context:\n${sourceContext}` }] : []),
      ...history,
      { role: 'user', content: message }
    ]
  };

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.ASTRA_AI_API_KEY}`
  };

  if (endpoint.includes('openrouter.ai')) {
    headers['HTTP-Referer'] = process.env.ASTRA_SITE_URL || 'https://example.com';
    headers['X-Title'] = process.env.ASTRA_SITE_TITLE || 'AstraX Bharat AI';
  }

  const response = await fetch(endpoint, { method: 'POST', headers, body: JSON.stringify(payload) });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Model API error ${response.status}: ${errorText.slice(0, 220)}`);
  }

  const data = await response.json();
  return data?.choices?.[0]?.message?.content || data?.output_text || data?.response || 'No response returned by model.';
}

function normalizeChatEndpoint(baseUrl) {
  if (baseUrl.includes('/chat/completions')) return baseUrl;
  return `${baseUrl.replace(/\/$/, '')}/chat/completions`;
}

async function searchWeb(query) {
  if (process.env.ASTRA_SERPER_API_KEY) {
    try {
      return await searchWithSerper(query);
    } catch {
      // continue
    }
  }

  if (process.env.ASTRA_SEARCH_ENDPOINT) {
    try {
      return await searchWithConfiguredEndpoint(query);
    } catch {
      // continue
    }
  }

  try {
    const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_redirect=1&skip_disambig=1`;
    const response = await fetch(url, { headers: { 'User-Agent': 'AstraX Bharat AI' } });
    if (!response.ok) throw new Error('DuckDuckGo search failed');
    const data = await response.json();
    const results = normalizeDuckDuckGo(data).slice(0, 6);
    if (results.length) return results;
  } catch {
    // ignore
  }

  return curatedSearchFallback(query);
}

async function searchWithSerper(query) {
  const response = await fetch('https://google.serper.dev/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': process.env.ASTRA_SERPER_API_KEY
    },
    body: JSON.stringify({ q: query, gl: 'in', hl: 'en', num: 8 })
  });
  if (!response.ok) throw new Error(`Serper error ${response.status}`);
  const data = await response.json();
  const organic = Array.isArray(data.organic) ? data.organic : [];
  return organic.map((item) => ({
    title: item.title || 'Result',
    url: item.link || '#',
    snippet: item.snippet || ''
  })).slice(0, 8);
}

async function searchWithConfiguredEndpoint(query) {
  const headers = { 'Content-Type': 'application/json' };
  if (process.env.ASTRA_SEARCH_API_KEY) headers.Authorization = `Bearer ${process.env.ASTRA_SEARCH_API_KEY}`;
  const response = await fetch(process.env.ASTRA_SEARCH_ENDPOINT, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query })
  });
  if (!response.ok) throw new Error(`Search endpoint error ${response.status}`);
  const data = await response.json();
  return normalizeSearchResults(data).slice(0, 8);
}

function normalizeDuckDuckGo(data) {
  const items = [];
  if (data.AbstractText && data.AbstractURL) {
    items.push({ title: data.Heading || 'DuckDuckGo Result', url: data.AbstractURL, snippet: data.AbstractText });
  }
  const topics = Array.isArray(data.RelatedTopics) ? data.RelatedTopics : [];
  for (const topic of topics) {
    if (topic.Text && topic.FirstURL) items.push({ title: trimTitle(topic.Text), url: topic.FirstURL, snippet: topic.Text });
    if (Array.isArray(topic.Topics)) {
      for (const nested of topic.Topics) {
        if (nested.Text && nested.FirstURL) items.push({ title: trimTitle(nested.Text), url: nested.FirstURL, snippet: nested.Text });
      }
    }
  }
  return items;
}

function normalizeSearchResults(data) {
  if (Array.isArray(data)) return data.map(normalizeSearchItem);
  if (Array.isArray(data.results)) return data.results.map(normalizeSearchItem);
  if (Array.isArray(data.items)) return data.items.map(normalizeSearchItem);
  return [];
}

function normalizeSearchItem(item) {
  return {
    title: item.title || item.name || 'Result',
    url: item.url || item.link || '#',
    snippet: item.snippet || item.content || item.description || ''
  };
}

async function buildOpportunityFeed() {
  const seed = readJson('opportunities.json', []);
  if (!process.env.ASTRA_SERPER_API_KEY) return seed;

  const queries = [
    'site:scholarships.gov.in India student scholarship official',
    'site:careers.google.com students internships official',
    'India student fellowships official opportunities'
  ];

  const collected = [];
  for (const query of queries) {
    const results = await searchWithSerper(query);
    results.forEach((result) => {
      collected.push({
        title: result.title,
        link: result.url,
        source: 'Serper refresh',
        category: 'Opportunity',
        date: new Date().toLocaleDateString('en-IN'),
        summary: result.snippet
      });
    });
  }

  return dedupeBy([...seed, ...collected], (item) => `${item.title}|${item.link}`).slice(0, 25);
}

function curatedSearchFallback(query) {
  const lower = query.toLowerCase();
  const items = [];

  if (/(cuet|neet|jee|nda|upsc)/.test(lower)) {
    const resources = readJson('official-resources.json', {});
    Object.entries(resources).forEach(([exam, links]) => {
      if (lower.includes(exam.toLowerCase())) {
        links.forEach((link) => items.push({ title: `${exam}: ${link.title}`, url: link.link, snippet: 'Official/legal starter resource' }));
      }
    });
  }

  if (lower.includes('scholarship') || lower.includes('student') || lower.includes('opportunity')) {
    mergeOpportunityData().forEach((item) => {
      items.push({ title: item.title, url: item.link, snippet: `${item.category || 'Opportunity'} - ${item.source || 'Official'}` });
    });
  }

  if (!items.length) {
    items.push(
      { title: 'National Scholarship Portal', url: 'https://scholarships.gov.in/', snippet: 'Official Government scholarship portal.' },
      { title: 'Google Student Programs', url: 'https://careers.google.com/students/', snippet: 'Official Google student opportunities.' },
      { title: 'UPSC Official Portal', url: 'https://upsc.gov.in/', snippet: 'Official UPSC examination announcements.' }
    );
  }
  return items.slice(0, 8);
}

function generateOfflineReply({ message, language, mode, psychologyAware, sources }) {
  const lower = message.toLowerCase();
  const currentLang = languageLabel(language);
  const sourceSummary = sources.length ? `\n\nI also found ${sources.length} web/official references in the source panel.` : '';

  if (psychologyAware && /(sad|stress|stressed|anxious|tired|lonely|confused|worried|burnout)/.test(lower)) {
    return `I noticed emotional pressure in your message. Start with one small step: breathe slowly, drink water, and tell me whether you want comfort, strategy, or a task plan. I can help in ${currentLang}.${sourceSummary}`;
  }
  if (/(cuet|neet|jee|nda|upsc)/.test(lower)) {
    return `I can help with exam planning, revision strategy, topic mapping, and official resource navigation. Open the Study Hub for official/legal starter links.${sourceSummary}`;
  }
  if (lower.includes('scholarship') || lower.includes('opportunity')) {
    return `Use the opportunity feed to track official scholarships, fellowships, Google programs, and internships. Refresh to load curated backend results.${sourceSummary}`;
  }
  if (lower.includes('image') || lower.includes('photo')) {
    return `Use Image Studio for local prompt styling and slider edits. For advanced AI edits, connect an image API in the backend.${sourceSummary}`;
  }
  if (lower.includes('mod apk') || lower.includes('crack') || lower.includes('premium version')) {
    return 'I cannot help create mod APKs, cracked apps, or bypass paid features. I can help find legal alternatives or official app links.';
  }
  return `AstraX Bharat AI backend mode is active. Current mode: ${modeName(mode)}. I can help with study planning, creator tasks, no-code app ideas, launcher shortcuts, and safe AI workflows.${sourceSummary}`;
}

function languageLabel(code) {
  return {
    'en-IN': 'English', 'hi-IN': 'Hindi', 'hinglish': 'Hinglish', 'ta-IN': 'Tamil', 'te-IN': 'Telugu', 'bn-IN': 'Bengali'
  }[code] || code;
}

function modeName(code) {
  return {
    general: 'General AI',
    study: 'Study Coach',
    builder: 'No-Code Builder',
    creator: 'Creator',
    launcher: 'Phone Launcher',
    calm: 'Calm Support'
  }[code] || 'General AI';
}

function trimTitle(text) {
  return String(text).split(' - ')[0].slice(0, 120);
}

function dedupeBy(list, keyFn) {
  const seen = new Set();
  return list.filter((item) => {
    const key = keyFn(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
