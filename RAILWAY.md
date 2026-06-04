# OpenRouter setup guide

## Backend env values
Use `.env`:

```bash
ASTRA_AI_BASE_URL=https://openrouter.ai/api/v1
ASTRA_AI_MODEL=openai/gpt-4.1-mini
ASTRA_AI_API_KEY=your_key
ASTRA_SITE_URL=https://your-domain.com
ASTRA_SITE_TITLE=AstraX Bharat AI
```

## Notes
- The backend automatically adds `HTTP-Referer` and `X-Title` headers for OpenRouter.
- You can change the model to any OpenRouter-supported model.
- Frontend also supports direct browser testing, but backend proxy is safer.
