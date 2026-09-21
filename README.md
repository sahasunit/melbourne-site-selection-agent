# Melbourne Site-Selection Agent

An AI agent that helps someone decide where in Melbourne to open a hospitality business, grounded in live City of Melbourne open-data APIs (pedestrian foot traffic + café/restaurant competition).

Live Link: https://melbourne-site-selection-agent.vercel.app/

## The Problem

Picking where to open a café or restaurant usually comes down to vibes — "this street feels busy" or "I've seen a few cafés around here." There's real, public data that could answer this properly (how busy is this corner actually, how many competitors already exist within walking distance) but it sits in raw government datasets nobody's going to manually query before signing a lease. People end up making a real financial decision on gut feel when the numbers are sitting there, unused.

## What it does

You ask a natural-language question — "is Carlton or Kensington better for a café?" — and the agent decides which tools it needs, calls the real City of Melbourne APIs, reasons over the results, and gives you a grounded answer with the actual numbers cited. It's stateful across turns, so you can ask a follow-up ("what about the competition there?") without restating context. Supports 9 inner-Melbourne areas right now (CBD, Kensington, Carlton, Docklands, East Melbourne, North Melbourne, Southbank, Parkville, West Melbourne) — not all of Melbourne, on purpose, because those are the areas the underlying pedestrian sensor network actually covers.

## Architecture

It's an agent, not RAG. It answers questions that need computation and multi-step tool use over structured data, not semantic retrieval over documents. That's a deliberate contrast with my first project (a RAG assistant) — same general shape of problem, completely different architecture, because the underlying data is completely different.

Layered structure, one layer per concern:

- **API layer** — thin FastAPI wrapper. Request validation (Pydantic), CORS, per-IP rate limiting, routing. No business logic lives here.
- **Agent orchestration layer** — the actual loop: sends the conversation + tool schemas to Claude, checks whether it wants to call a tool, dispatches it, feeds the result back, repeats until Claude has a final answer or hits a tool-call ceiling. Also owns multi-turn conversation memory (keyed by a server-issued UUID, not by IP — rate limiting and conversation identity are deliberately separate concerns) and structured logging of every tool call (input, timing, outcome).
- **Tools layer** — `get_foot_traffic` and `get_nearby_competition`. Each owns its own input schema and its own normalization of whatever comes back from the data layer. Domain logic (picking the busiest hour, filtering competitors by distance, deduplicating venues) lives here, not lower down.
- **Data-access layer** — the actual HTTP calls to the City of Melbourne APIs, with retry-with-backoff and timeouts. This is where the resilience lives, since the external APIs are the least-controlled dependency.

## Key Design Decisions

**No vector store.** This was the first real fork in the road — the original plan had a second tool built on CLUE (a business-density dataset), which would've made this look more RAG-like. I caught a real problem before writing that tool: the pedestrian data is per-sensor (one exact point on a map), and CLUE data is per-suburb (aggregated across dozens of blocks). Comparing a single street corner's foot traffic against an entire suburb's business count would've looked precise without actually being a fair comparison. Swapped the second tool to a venue-level café/restaurant dataset instead, so both tools operate on the same granularity — a real point on a map, not a suburb.

**Resilience is split into two, deliberately.** Retry-with-backoff (tenacity, 3 attempts, exponential backoff, only on 5xx/timeouts/network errors, never on 4xx) lives in the data-access layer. A separate, hard tool-call ceiling (`MAX_TOOL_CALLS`) lives in the agent loop, sized as floor + a small buffer, not picked arbitrarily — it's there specifically so a confused agent can't loop indefinitely burning API calls, independent of whatever retry logic is happening underneath.

**Caching is deliberately asymmetric.** Foot-traffic data is cached for 2 days (matches how often the underlying sensor data actually settles into a complete day); competition data is cached for 12 weeks (the census dataset it's built on only updates roughly annually, so a shorter cache buys nothing).

**Area coverage is 9, not "all of Melbourne."** Considered expanding to ~50 sensors using real point-in-polygon geometry against CLUE boundary shapes. Realized before building it that the café dataset only has 13 possible area values total, so the actual task was picking one good representative sensor per named area, not geometric matching of every sensor. Systematically checked all ~134 sensors against all 13 areas — 3 areas (South Yarra, Port Melbourne, West Melbourne Industrial) genuinely have zero pedestrian sensor coverage. Rather than force a weak match to hit a rounder number, left those out and documented why.

**System prompt guards against scope creep.** The agent is explicitly instructed not to attempt a broad "compare all of Melbourne"-style question (which would blow past the tool-call ceiling and burn real API quota), and to politely redirect rather than attempt it even if the user rephrases the same request repeatedly. This is a soft, prompt-level guard, not a hard backend block — a defensible v1 tradeoff, not an oversight.

## Resilience

Per-IP rate limiting (5 requests per IP per fixed 2-day window) — basic abuse protection and cost control, not DDoS protection. Retry-with-backoff on the data layer for genuinely transient failures. Structured logging on every tool call so a production issue is actually debuggable, not a guess. Test suite covers the tool-level logic (mocked API responses, no real network calls) plus one full-loop integration test on the agent orchestration itself.

## Tech Stack

Backend: FastAPI, Python 3.11, uv
Data sources: City of Melbourne open data (pedestrian counting sensors, café/restaurant seating dataset)
LLM: Claude (Anthropic)
Frontend: React, Styled Components
Deploy: Railway (backend), Vercel (frontend), GitHub: codebase

## Running Locally

Prerequisites: Python 3.11, uv, Node.js 18+, and an Anthropic API key.

### Backend

git clone https://github.com/sahasunit/melbourne-site-selection-agent.git
cd melbourne-site-selector-agent
uv sync

Copy `.env.example` to `.env` and fill in `ANTHROPIC_API_KEY`.

`ALLOWED_ORIGINS` controls CORS — a comma-separated list of origins allowed to call `/ask`. Defaults to `http://localhost:3000` for local dev; when deploying, add your production frontend URL (e.g. `ALLOWED_ORIGINS=http://localhost:3000,https://your-app.vercel.app`).

uv run uvicorn app.api.main:app --reload # runs at localhost:8000


### Frontend

cd frontend
npm install

Set the backend URL in `.env` (see `.env.example` for the exact variable name), pointing at `http://localhost:8000` for local dev.

npm run dev


## Deploying

Backend (Railway): the repo includes a Procfile (`web: uv run uvicorn app.api.main:app --host 0.0.0.0 --port $PORT`) so Railway can run it out of the box. Set `ANTHROPIC_API_KEY` and `ALLOWED_ORIGINS` (including your Vercel domain) as environment variables on the Railway project.
Frontend (Vercel): set the project's root directory to `frontend`, and add the backend URL environment variable pointing at the deployed Railway URL.

## Known Limitations

Covers 9 inner-Melbourne areas, not the whole city — a real constraint of the pedestrian sensor network, documented rather than papered over with a forced match.
In-memory caching, conversation storage, and rate limiting — all reset if the server restarts. Fine for a portfolio-scale demo, not production-grade; a real version would move this to Redis or a database.
No hard backend enforcement against a genuinely adversarial user trying to force a broad, quota-burning query — the system prompt handles this gracefully in the normal case, but it's a soft guard, not a hard one.
Peak-hour foot traffic is reported from a single representative sensor per area, not an average across the whole area — same simplification made deliberately from the first session, carried through the whole build.