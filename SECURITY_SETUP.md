# NutriEase security remediation & setup

## REQUIRED OUTSIDE THIS ZIP (cannot be performed by a code patch)
1. REVOKE/ROTATE **all** credentials that were previously in `sample.env` (two Gemini keys, Pexels key, MongoDB URI/password, OAuth client secrets, Auth secret). Any exposed key must be considered compromised, including those preserved in Git history or previous deployments. Reissue OAuth secrets after checking authorized redirect URIs. Change database password, minimize network/role privileges and review access logs.
2. Inspect Google AI Studio / Cloud usage and quotas and configure restrictive API quotas and budget alerts. This application limit is **not** a substitute for provider-side hard spending controls.
3. Disable old public deployments and rotate environment variables there; remove credentials from repository history using an appropriate process. Removing a line in HEAD does not erase historical commits, forks or old builds.
4. Review access and deployment logs; investigate any unexpected activity with the provider. It is **not possible to confirm the cause of previous credit use from source code**.

## Local setup
- `npm ci` (network needed), copy `.env.example` to `.env.local`, fill fresh secrets; `npm run dev`.
- `AI_ENABLED=false` and `IMAGES_ENABLED=false` intentionally disable paid third-party calls. Login / databases require valid credentials; use a local or isolated test MongoDB.
- For a controlled live test set `AI_ENABLED=true`, configure `GEMINI_API_KEY` (without `NEXT_PUBLIC_`), restrict it at provider level. Images require `IMAGES_ENABLED=true` plus `PEXELS_API_KEY`.
- The API now requires NextAuth sessions and checks ownership of meal plans based on server session. Older records without matching `userID` may need a **carefully verified administrator migration**, not public query fallbacks.
- Daily AI quota: at most 3 attempts/user/feature/day, with global ceilings of 20 AI attempts or 120 image lookups/day. MongoDB atomically stores counters. Expensive generation requests still need provider-level quotas and monitoring.
- In Next.js, `NEXT_PUBLIC_` variables are embedded in browser code. Never use that prefix for API keys or secrets.
- Never send real credentials to LLMs/chat, add `.env.local` to Git, or publicly share backups of the original repo.

## Notes and remaining risk
- This is a defensive code patch, not a penetration test or a guarantee of production security.
- Authentication is necessary; configure NextAuth correctly before protected routes work.
- Provider usage quotas, billing alarms, network/database access policies, dependency security reviews and real integration tests remain operator responsibilities.
- Existing documents have been excluded from the distributable to reduce accidental exposure of sensitive data. Re-add only sanitized docs if needed.
