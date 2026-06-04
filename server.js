const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

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
      return sendJson(res, 200, {
        ok: true,
        app: 'AstraX Bharat AI',
        mode: 'minimal-server',
        time: new Date().toISOString()
      });
    }

    if (req.method === 'GET' && (url.pathname === '/' || url.pathname === '')) {
      return serveIndex(res);
    }

    if (req.method === 'GET' && url.pathname === '/api/resources') {
      return sendJson(res, 200, {
        resources: readJson('official-resources.json', {})
      });
    }

    if (req.method === 'GET' && url.pathname === '/api/opportunities') {
      return sendJson(res, 200, {
        generatedAt: new Date().toISOString(),
        items: mergeOpportunities()
      });
    }

    if (req.method === 'POST' && url.pathname === '/api/opportunities-refresh') {
      return sendJson(res, 200, {
        ok: true,
        items: mergeOpportunities()
      });
    }

    if (req.method === 'POST' && url.pathname === '/api/search') {
      const body = await readBody(req);
      const query = String(body.query || '').trim();
      return sendJson(res, 200, {
        query,
        results: simpleSearch(query)
      });
    }

    if (req.method === 'POST' && url.pathname === '/api/chat') {
      const body = await readBody(req);
      const message = String(body.message || '').trim();
      return sendJson(res, 200, {
        reply: offlineReply(message),
        sources: simpleSearch(message).slice(0, 3)
      });
    }

    if (req.method === 'POST' && (url.pathname === '/api/image-edit' || url.pathname === '/api/tts')) {
      return sendJson(res, 501, {
        error: 'This minimal server does not proxy advanced APIs yet.'
      });
    }

    if (req.method === 'GET') {
      return serveStatic(res, url.pathname);
    }

    return sendJson(res, 404, { error: 'Not found' });
  } catch (error) {
    return sendJson(res, 500, { error: error.message || 'Server error' });
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`AstraX Bharat AI running on http://0.0.0.0:${PORT}`);
});

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

function sendJson(res, status, payload) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(payload, null, 2));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (chunk) => {
      raw += chunk;
      if (raw.length > 1024 * 1024) {
        reject(new Error('Request body too large'));
        req.destroy();
      }
    });
    req.on('end', () => {
      if (!raw) return resolve({});
      try {
        resolve(JSON.parse(raw));
      } catch {
        resolve({});
      }
    });
    req.on('error', reject);
  });
}

function readJson(fileName, fallback) {
  try {
    const filePath = path.join(DATA_DIR, fileName);
    const raw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function mergeOpportunities() {
  const seed = readJson('opportunities.json', []);
  const generated = readJson('generated-opportunities.json', []);
  return dedupeBy(seed.concat(generated), (item) => `${item.title}|${item.link}`);
}

function simpleSearch(query) {
  const q = String(query || '').toLowerCase();
  const results = [];
  const resources = readJson('official-resources.json', {});
  const opportunities = mergeOpportunities();

  Object.keys(resources).forEach((exam) => {
    if (!q || q.includes(exam.toLowerCase())) {
      resources[exam].forEach((item) => {
        results.push({
          title: `${exam}: ${item.title}`,
          url: item.link,
          snippet: 'Official or legal starter resource.'
        });
      });
    }
  });

  if (q.includes('scholarship') || q.includes('student') || q.includes('opportunity') || q.includes('google')) {
    opportunities.forEach((item) => {
      results.push({
        title: item.title,
        url: item.link,
        snippet: `${item.category || 'Opportunity'} - ${item.source || 'Official'}`
      });
    });
  }

  if (!results.length) {
    results.push(
      {
        title: 'National Scholarship Portal',
        url: 'https://scholarships.gov.in/',
        snippet: 'Official scholarship portal.'
      },
      {
        title: 'Google Student Programs',
        url: 'https://careers.google.com/students/',
        snippet: 'Official Google student opportunities.'
      },
      {
        title: 'UPSC Official Portal',
        url: 'https://upsc.gov.in/',
        snippet: 'Official UPSC announcements.'
      }
    );
  }

  return results.slice(0, 8);
}

function offlineReply(message) {
  const text = String(message || '').trim().toLowerCase();

  if (!text) {
    return 'Namaste! AstraX Bharat AI minimal server is live. Frontend should now open correctly on Railway.';
  }

  if (/cuet|neet|jee|nda|upsc/.test(text)) {
    return 'I can help with exam planning, revision strategy, and official resources. Open the Study Hub section for legal starter links.';
  }

  if (/scholarship|opportunity|internship|google/.test(text)) {
    return 'Use the opportunity feed for scholarships, internships, and student programs. You can also refresh the feed in the app.';
  }

  if (/sad|stress|anxious|tired|worried|burnout/.test(text)) {
    return 'I noticed stress in your message. Take one slow breath and tell me if you want emotional support, a plan, or a simple task list.';
  }

  if (/photo|image|pinterest/.test(text)) {
    return 'Use Image Studio and Pinterest Creator in the frontend. Those tools work directly in the browser UI.';
  }

  return 'AstraX Bharat AI minimal backend is active. Your frontend should load properly now. Advanced AI can be connected later with OpenRouter, Serper, and Firebase.';
}

function serveIndex(res) {
  fs.readFile(path.join(ROOT, 'index.html'), (err, content) => {
    if (err) return sendJson(res, 404, { error: 'index.html not found' });
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(content);
  });
}

function serveStatic(res, pathname) {
  const requestPath = decodeURIComponent(pathname || '/');

  if (isDeniedStaticPath(requestPath)) {
    return sendJson(res, 404, { error: 'Not found' });
  }

  if (!path.extname(requestPath)) {
    return serveIndex(res);
  }

  const safePath = path.normalize(requestPath).replace(/^([.][.][\/\\])+/, '');
  const fullPath = path.join(ROOT, safePath);

  if (!fullPath.startsWith(ROOT)) {
    return sendJson(res, 403, { error: 'Forbidden' });
  }

  fs.stat(fullPath, (err, stat) => {
    if (err || !stat.isFile()) {
      return serveIndex(res);
    }

    const ext = path.extname(fullPath).toLowerCase();
    const contentType = MIME[ext];
    if (!contentType) {
      return sendJson(res, 404, { error: 'Not found' });
    }

    fs.readFile(fullPath, (readErr, content) => {
      if (readErr) return sendJson(res, 500, { error: 'Failed to read file' });
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    });
  });
}

function isDeniedStaticPath(requestPath) {
  const lower = String(requestPath || '').toLowerCase();
  return (
    lower.includes('.env') ||
    lower.includes('firebase.rules') ||
    lower.includes('firebase.config.example') ||
    lower.startsWith('/docs/') ||
    lower.startsWith('/data/')
  );
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
