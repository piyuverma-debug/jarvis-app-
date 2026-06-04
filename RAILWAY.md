# Final live setup checklist

## Public app URL
Your current public URL is:

```text
https://jarvis-app.railway.app
```

## Permanent QR
Included file:

```text
qr/jarvis-app-railway-permanent-qr.png
```

## OpenRouter live setup
Add these on Railway:

```text
ASTRA_AI_BASE_URL=https://openrouter.ai/api/v1
ASTRA_AI_MODEL=openai/gpt-4.1-mini
ASTRA_AI_API_KEY=YOUR_OPENROUTER_KEY
ASTRA_SITE_URL=https://jarvis-app.railway.app
ASTRA_SITE_TITLE=AstraX Bharat AI
```

## Serper live setup
Add:

```text
ASTRA_SERPER_API_KEY=YOUR_SERPER_KEY
```

Then refresh opportunity feed:

```bash
npm run feed:refresh
```

## Firebase live setup
In Firebase:
1. Enable Email/Password auth
2. Enable Firestore
3. Add `jarvis-app.railway.app` to Authorized domains
4. Put Firebase web app config into the app Settings screen

## Android
### PWA
Open:
```text
https://jarvis-app.railway.app
```
and tap Install.

### APK
Follow:
```text
docs/ANDROID.md
```
