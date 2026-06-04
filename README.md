# AstraX Bharat AI

A futuristic India-first personal AI assistant starter with:

- installable PWA frontend
- Node backend starter
- OpenRouter-ready AI integration
- Serper-ready search integration
- Firebase-ready auth + Firestore hooks
- multilingual chat shell
- study hub for CUET / NEET / JEE / NDA / UPSC
- scholarship and opportunity feed
- no-code starter app generator
- image prompt styling + local editor
- Pinterest description/caption generator
- quick mobile actions
- voice preview + browser speech input
- deploy/install/QR guidance
- Capacitor Android-ready setup docs

## Important legal limits

This project intentionally **does not** include:

- pirated PW or other copyrighted coaching notes
- cracked or mod APK generation
- premium unlock / bypass tools
- proprietary ChatGPT source code

It is designed as a **safe starter** that you can extend with your own content, official links, and licensed APIs.

## Project structure

- `index.html` – frontend UI
- `styles.css` – futuristic styling
- `app.js` – client logic
- `server.js` – lightweight Node backend + API routes
- `data/official-resources.json` – official/legal starter resources
- `data/opportunities.json` – curated opportunity feed seed
- `data/generated-opportunities.json` – refreshed opportunity feed output
- `scripts/refresh-opportunities.js` – Serper-based feed refresh script
- `firebase.config.example.json` – Firebase config example
- `manifest.webmanifest` / `sw.js` – PWA support
- `capacitor.config.json` – Android shell starter
- `docs/ANDROID.md` – APK wrapping guide
- `docs/DEPLOY.md` – deployment guide
- `docs/FIREBASE.md` – Firebase setup guide
- `docs/OPENROUTER.md` – OpenRouter setup guide
- `docs/SERPER.md` – Serper setup guide
- `docs/FINAL-LIVE-SETUP.md` – final live URL/QR/setup checklist
- `firebase.rules.example` – Firestore rules starter

## Run locally

```bash
npm start
```

Open:

```text
http://localhost:3000
```

## Check code

```bash
npm run check
```

## Refresh opportunity feed

```bash
npm run feed:refresh
```

If `ASTRA_SERPER_API_KEY` is missing, the script falls back to the seed feed.

## Environment variables

Copy `.env.example` to `.env` and configure:

- `ASTRA_AI_BASE_URL`
- `ASTRA_AI_MODEL`
- `ASTRA_AI_API_KEY`
- `ASTRA_SITE_URL`
- `ASTRA_SITE_TITLE`
- `ASTRA_SERPER_API_KEY`
- or `ASTRA_SEARCH_ENDPOINT` / `ASTRA_SEARCH_API_KEY`

## API routes

- `GET /api/health`
- `GET /api/resources`
- `GET /api/opportunities`
- `POST /api/opportunities-refresh`
- `POST /api/search`
- `POST /api/chat`
- `POST /api/image-edit` (placeholder)
- `POST /api/tts` (placeholder)

## Search behavior

Priority order:
1. Serper if configured
2. custom search endpoint if configured
3. public DuckDuckGo-based fallback
4. curated official fallback

## Firebase behavior

Frontend includes auth and Firestore hooks, but you must:
- add your Firebase web config
- enable Email/Password auth
- enable Firestore
- authorize your deployed domain

See `docs/FIREBASE.md`.

## Mobile / Android

### PWA install
Public app URL:

```text
https://jarvis-app.railway.app
```

Permanent QR file:

```text
qr/jarvis-app-railway-permanent-qr.png
```

Open the public URL on Android and use Add to Home Screen / Install.

### APK shell
Use:

```bash
npm run android:add
npm run android:sync
npm run android:open
```

Then build APK/AAB in Android Studio.

## Railway deploy
Railway-ready files are included:
- `railway.toml`
- `Procfile`
- `docs/RAILWAY.md`

After Railway gives you a public URL, that URL can be turned into a permanent QR code for mobile install/share.

## Recommended next upgrades

1. Add production auth rules and user roles
2. Move all sensitive provider calls fully to backend
3. Connect real TTS and image APIs
4. Add file upload / knowledge base / RAG memory
5. Add database for full persistent chats and notes
6. Add admin panel for resources and opportunity management
7. Add push notifications for scholarships/opportunities
