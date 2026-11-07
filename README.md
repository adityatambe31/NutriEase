> SECURITY: Read [SECURITY_SETUP.md](SECURITY_SETUP.md) before starting. All previously exposed keys MUST be rotated. AI calls default to OFF.

# NutriEase

Smart Bites, Better Lives.

NutriEase is an AI-assisted nutrition platform that generates personalized meal plans based on user profile, dietary preferences, health goals, and cuisine preference.

## Project Revival Status

This project has been revived and stabilized for active development and Vercel deployment.

Revival goals completed:

- Removed Azure-first assumptions and made auth providers conditional.
- Repaired environment configuration mismatches.
- Fixed runtime and build failures caused by import-time env validation.
- Hardened AI meal-plan generation/parsing for malformed or truncated model output.
- Fixed meal-plan save and view issues where plans rendered as empty cards.
- Removed hydration errors caused by nested html/body tags in non-root layouts.
- Added CI/CD workflows for GitHub Actions + Vercel deploy hook.

## Tech Stack

- Frontend: Next.js App Router, React, TypeScript, Tailwind CSS
- Auth: NextAuth v5
- Database: MongoDB Atlas + Mongoose
- AI: Google Gemini
- Deployment: Vercel

## Key Features

- AI-generated weekly meal plans
- User-authenticated planner and saved plans
- Meal images with fallback handling
- Nutrition and cost hints per meal
- Assistant and health-related sections

## What Was Fixed During Revival

### 1. Auth and Environment Compatibility

- Added support for both old and new env naming conventions for Google/GitHub keys.
- Provider loading is conditional; missing provider keys no longer crash startup.
- `NEXTAUTH_SECRET`/`AUTH_SECRET` fallback support improved.
- `NEXTAUTH_URL` guidance corrected for local vs production.

### 2. Deployment Readiness

- Added environment-aware URL mapping for dev/prod (optional staging).
- Added CI pipeline for lint/build verification.
- Added CD pipeline using `VERCEL_DEPLOY_HOOK_URL`.
- Archived legacy Azure workflows and disabled execution.

### 3. Runtime Stability

- Replaced import-time throws with runtime checks in API/helpers where needed.
- Improved API error visibility for save failures.
- Added safer Mongo save handling for AI-derived ingredient values.

### 4. Planner Reliability

- Added robust JSON extraction and cleanup for AI output.
- Added compact retry flow when AI returns truncated JSON.
- Added parser support for multiple meal JSON shapes.
- Prevented saving structurally empty meal plans.
- Improved user-facing error toasts for quota/key/config issues.

### 5. UI and Hydration Fixes

- Removed nested html/body usage from non-root layouts.
- Fixed route-level hydration mismatches.
- Improved dropdown/modal behavior that caused layout/scroll issues.

## Environment Variables

Use `.env.local` for local development.

Minimum required for core planner/auth flow:

- `NEXT_PUBLIC_ENVIRONMENT` (`dev` locally, `prod` in production)
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `MONGODB_URI`
- `AUTH_GOOGLE_ID`
- `AUTH_GOOGLE_SECRET`
- `AUTH_GITHUB_ID`
- `AUTH_GITHUB_SECRET`
- `GEMINI_API_KEY`
- `GEMINI_API_KEY_COOK`
- `PEXELS_API_KEY`

Optional:

- `NEXT_PUBLIC_CLARITY_PROJECT_ID`
- `NEXT_PUBLIC_APP_URL_DEV`
- `NEXT_PUBLIC_APP_URL_PROD`
- `NEXT_PUBLIC_APP_URL_STAGING`
- `VERCEL_DEPLOY_HOOK_URL` (GitHub Actions secret for CD workflow)

## Local Development

Install dependencies and run:

```bash
npm install
npm run dev
```

App runs at `http://localhost:3000`.

## Production Notes

- Set production env vars in Vercel Project Settings.
- Ensure MongoDB Atlas Network Access allows Vercel runtime access.
- Ensure OAuth callback URLs exactly match production domain:
	- `https://<your-domain>/api/auth/callback/google`
	- `https://<your-domain>/api/auth/callback/github`

## Security Note

If any credentials were ever exposed in chat, screenshots, commit history, or logs, rotate them immediately:

- OAuth client secrets
- MongoDB credentials
- NextAuth secret
- Gemini/Pexels API keys

## Ownership and Attribution

This project includes equal rights and attribution for Daksh Chaudhary.
Any reuse, modification, or distribution should preserve contributor credit and ownership context.

## License

Private project. Add a license file if this repository is intended for public distribution.
