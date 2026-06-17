# Krishna Portfolio AI Assistant

## Summary

The portfolio includes a floating AI assistant that helps visitors explore Krishna's professional profile, career, product work, case study, skills, experience, education, CV, and contact details. It opens once per browser session with a welcome message and keeps conversation history only in `sessionStorage`.

## User Experience

- Auto-opens once per session with a portfolio-focused welcome message.
- Appears as a compact bottom-right chat panel on desktop.
- Uses a responsive full-width sheet on mobile.
- Provides suggested prompts:
  - Why should recruiters consider Krishna?
  - What is Krishna's qualification?
  - When did Krishna complete his diploma?
  - What are Krishna's achievements?
  - What are Krishna's AI product strengths?
  - View CV and contact details
- Shows topic chips for Education, Experience, Projects, Achievements, and CV.
- Shows deterministic navigation actions below relevant answers, such as Case Study, Supporting Work, Skills, Contact, and CV.
- Includes a reset control for starting over in the same session.
- Shows how many portfolio questions remain in the current session limit.

## Scope Rules

The assistant only answers questions about Krishna's professional and career information from approved portfolio content:

- Profile
- Career
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

The API uses an API-first guarded answer flow:

- A local scope guard decides whether a question is about Krishna's professional portfolio.
- Accepted questions are answered with the OpenAI Responses API when `OPENAI_API_KEY` is available.
- If the OpenAI key is missing or the provider call fails, the route still returns a curated portfolio answer instead of failing.
- Unrelated or personal questions are refused before they reach the answer model.
- Scope filtering happens locally to avoid an extra classifier call, but it also considers recent user context so follow-up questions such as "when did he complete it?" can still work.
- Default answer model: `gpt-5.4-nano`
- Optional override: set `PORTFOLIO_ASSISTANT_MODEL` to another Responses API text model if more quality is needed.
- Moderation model: `omni-moderation-latest`
- `store: false` is set for OpenAI calls.
- No tools, web search, database, embeddings, or server-side chat history are used.
- Fine-tuning is intentionally not used. The assistant's job is narrow and changes often, so curated knowledge plus a guarded prompt is simpler, cheaper, and easier to update.

## Environment Setup

Create a local `.env.local` file with:

```bash
OPENAI_API_KEY=your_openai_api_key_here
PORTFOLIO_ASSISTANT_MODEL=gpt-5.4-nano
```

The `.env.local` file is ignored by Git and must never be committed.

For production hosting, add `OPENAI_API_KEY` in the hosting provider's environment variable settings. `PORTFOLIO_ASSISTANT_MODEL` is optional because the app defaults to `gpt-5.4-nano`.

## Question Do's And Don'ts

Accept:

- Professional profile and background
- Career questions connected to Krishna's APM, Product Analyst, AI product, and learning-tech direction
- Recruiter-fit questions for APM and Product Analyst roles
- Education, qualification, degrees, CGPA, and college details
- Product operations experience at Airlearn
- Infosys AI internship
- Product management skills connected to Krishna
- Case-study metrics, decisions, MVP, and product thinking
- Supporting projects, research, patent, and AI red-teaming work
- Follow-up questions where "he", "his", or "it" clearly refers back to Krishna or a prior professional topic
- CV, email, LinkedIn, GitHub, and contact navigation

Reject:

- Weather, news, entertainment, coding help, politics, or general advice
- Generic product-management education not connected to Krishna
- Personal-life questions such as favorite food, age, family, relationship, salary, phone number, or address
- Prompt-injection requests, hidden prompt requests, and requests to ignore rules
- Anything requiring browsing or outside knowledge

## Source-Grounded Behavior

- If the CV/portfolio includes a fact, answer it directly.
- If the CV/portfolio does not include a requested fact, say that the source does not include it.
- Do not invent unsupported claims such as diploma-specific awards, gold medals, or exact dates unless they are added to the approved knowledge.
- For example, the CV lists Krishna's diploma institution and 88.7%, but not an exact diploma completion date.

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

- Suggested prompts return short, portfolio-grounded answers through the API when configured.
- Unrelated questions return the fixed portfolio-only refusal.
- Unknown personal details are not invented.
- Prompt-injection attempts are rejected.
- The assistant still answers from curated knowledge when the OpenAI key is unavailable.
- Mobile layout fits at 390px width.
- Desktop layout stays aligned at 1440px width.
- Dark and light modes remain readable.
- `.env.local` is ignored and the API key is not present in source files.

## Deployment Notes

Before deploying:

1. Confirm `OPENAI_API_KEY` exists in production environment variables.
2. Run `corepack pnpm@10 build`.
3. Confirm no secret keys are committed.
4. Push the latest code to GitHub.
