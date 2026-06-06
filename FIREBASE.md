# Deploy guide

## Quick local run
```bash
npm start
```
Open `http://localhost:3000`

## Production hosting ideas
- Render
- Railway
- Fly.io
- Any VPS / Node host
- Docker-compatible platforms

## Required steps for production
1. Copy `.env.example` to `.env` or configure environment variables in your host.
2. Add `ASTRA_AI_*` variables for chat.
3. Add `ASTRA_SEARCH_*` variables for better search citations.
4. Deploy on HTTPS.
5. Open the app on mobile and use Install / Add to Home Screen.

## Notes
- Better web citations usually need a proper search provider.
- Real human-like Indian voices require a licensed TTS provider.
- Real AI image editing requires a provider-specific backend.
