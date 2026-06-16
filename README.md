# M Krishna Portfolio

Personal portfolio for M Krishna, focused on Associate Product Manager and Product Analyst roles in AI products, learning technology, and product operations.

## What Is Included

- `app/` - Next.js App Router pages and API routes.
- `components/` - Shared UI, navigation, case-study, and assistant components.
- `lib/` - Utility helpers and curated portfolio knowledge for the assistant.
- `hooks/` - Shared React hooks.
- `public/` - Static public assets, including the CV and site icons.
- `docs/` - Project notes and assistant documentation.

## Main Routes

- `/` - Portfolio home and featured case study.
- `/case-study` - Airlearn Mistakes Review product case study.
- `/work` - Supporting AI, safety, and NLP work.
- `/about` - Skills, competencies, and contact details.
- `/api/chat` - Guarded portfolio assistant API.

## Local Setup

```bash
corepack pnpm@10 install
corepack pnpm@10 dev
```

Create `.env.local` for local assistant responses:

```bash
OPENAI_API_KEY=your_openai_api_key_here
PORTFOLIO_ASSISTANT_MODEL=gpt-5.4-nano
```

`.env.local` is ignored by Git. Never commit API keys.

## Checks

```bash
corepack pnpm@10 build
corepack pnpm@10 lint
```

## Assistant

The floating portfolio assistant answers only from approved portfolio knowledge. It uses a low-cost default model with curated local fallback responses. See [docs/AI_ASSISTANT.md](docs/AI_ASSISTANT.md).
