# Krishna Portfolio AI Assistant

## Summary

The portfolio includes a floating AI assistant that helps visitors explore Krishna's profile, product work, case study, skills, experience, education, CV, and contact details. It opens once per browser session with a welcome message and keeps conversation history only in `sessionStorage`.

## User Experience

- Auto-opens once per session with a portfolio-focused welcome message.
- Appears as a compact bottom-right chat panel on desktop.
- Uses a responsive full-width sheet on mobile.
- Provides suggested prompts:
  - Summarize Krishna's profile
  - Explain the main case study
  - What are Krishna's PM skills?
  - Show supporting work
  - View CV and contact details
- Shows deterministic navigation actions below relevant answers, such as Case Study, Supporting Work, Skills, Contact, and CV.

## Scope Rules

The assistant only answers questions about Krishna and approved portfolio content:

- Profile
- Experience
- Education
- Product skills
- Projects
- Case study
- Supporting work
- CV
- Contact details

Unrelated questions receive a fixed refusal that redirects visitors to portfolio-related prompts. Unknown details are not invented.

## Architecture

- Client component: `components/portfolio-assistant.tsx`
- API route: `app/api/chat/route.ts`
- Curated knowledge: `lib/portfolio-knowledge.ts`
- AI message UI:
  - `components/ai-elements/message.tsx`
  - `components/ai-elements/conversation.tsx`

The API uses a hybrid answer flow:

- Suggested prompts and common portfolio questions answer from curated local knowledge.
- The OpenAI Responses API is used only for nuanced in-scope portfolio questions when `OPENAI_API_KEY` is available.
- If the OpenAI key is missing or the provider call fails, the route still returns a curated portfolio answer instead of failing.
- Scope filtering happens locally to avoid an extra classifier call.
- Answer model: `gpt-5.4-mini`
- Moderation model: `omni-moderation-latest`
- `store: false` is set for OpenAI calls.
- No tools, web search, database, embeddings, or server-side chat history are used.

## Environment Setup

Create a local `.env` file with:

```bash
OPENAI_API_KEY=your_openai_api_key_here
```

The `.env` file is ignored by Git and must never be committed.

For production hosting, add `OPENAI_API_KEY` in the hosting provider's environment variable settings.

## Safety And Limits

- Message length is limited to 600 characters.
- Recent conversation context is capped.
- Session requests are rate-limited.
- Unsafe input is checked with OpenAI moderation.
- Prompt-injection attempts are rejected when they ask for anything outside the approved portfolio scope.
- Browser storage is session-only.

## Verification

Run the production build:

```bash
corepack pnpm@10 build
```

Manual checks to perform:

- Suggested prompts return portfolio-grounded answers without requiring a model call.
- Unrelated questions return the fixed portfolio-only refusal.
- Unknown personal details are not invented.
- Prompt-injection attempts are rejected.
- The assistant still answers from curated knowledge when the OpenAI key is unavailable.
- Mobile layout fits at 390px width.
- Desktop layout stays aligned at 1440px width.
- Dark and light modes remain readable.
- `.env` is ignored and the API key is not present in source files.

## QA Artifacts

Updated screenshots are stored in `qa-screenshots/`:

- `12-chat-desktop-dark.png`
- `13-chat-mobile-dark.png`
- `14-chat-answer-mobile.png`
- `QA_REPORT.md`

## Deployment Notes

Before deploying:

1. Confirm `OPENAI_API_KEY` exists in production environment variables.
2. Run `corepack pnpm@10 build`.
3. Confirm no secret keys are committed.
4. Push the latest code to GitHub.
