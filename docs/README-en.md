# Documentation

[日本語](README.md) | English

## Purpose

This document organizes the current implementation, authentication flow, and required settings.

## Implementation Overview

- Next.js App Router MPA (`/`, `/login`, `/about`, `/items`, `/settings`)
- API routes
  - `/api/health`: health check
  - `/api/lang`: language cookie proxy
  - `/api/items`: legacy API replacement that returns 410 (Graph is fetched from the client)
- MSAL.js + Microsoft Graph API served from a single container
- UI built with Tailwind CSS

## Authentication Flow (Microsoft Entra ID)

1. `AppProviders` initializes `PublicClientApplication` and processes redirects with `handleRedirectPromise()`.
2. `/login` triggers `loginRedirect()` to start Entra ID sign-in.
3. After sign-in, MSAL stores tokens in `sessionStorage` and sets the `activeAccount`.
4. `/items` calls `acquireTokenSilent()` and fetches `/me` from Microsoft Graph.
5. If `interaction_required` occurs, `acquireTokenRedirect()` with `prompt: "consent"` is used.
6. Logout uses `logoutRedirect()`.

## Language Switching Flow

- `LanguageSwitcher` navigates to `/api/lang?lang=...&redirect=...`.
- `/api/lang` sets the `app_lang` cookie and redirects back.
- Implemented as a proxy (no middleware).

## Configuration & Environment Variables

Client/server configuration is validated at startup with Zod.

| Variable                                | Purpose                                               | Required |
| --------------------------------------- | ----------------------------------------------------- | -------- |
| `PORT`                                  | HTTP listening port                                   | ✅       |
| `NODE_ENV`                              | `development` / `production` / `test`                 | ✅       |
| `NEXT_PUBLIC_AZURE_AD_CLIENT_ID`        | Entra ID application (client) ID                      | ✅       |
| `NEXT_PUBLIC_AZURE_AD_TENANT_ID`        | Entra ID directory (tenant) ID                        | ✅       |
| `NEXT_PUBLIC_AZURE_AD_REDIRECT_URI`     | Redirect URI                                          | ✅       |
| `NEXT_PUBLIC_DEBUG_TOKEN`               | Token debug view (enable with "1")                   | Optional |
| `APPLICATIONINSIGHTS_CONNECTION_STRING` | Application Insights connection string                | Optional |

## Microsoft Entra ID / Graph Setup

- Register the app in Entra ID and add `/auth/popup.html` as a redirect URI.
- Grant Microsoft Graph `User.Read` permission.
- If extra consent is needed, `/items` shows a consent button.

## Notes

- The application runs as a single container (`next start`).
- When `NEXT_PUBLIC_DEBUG_TOKEN=1`, `/items` shows token debug data (do not share).

## Related Files

- `src/components/providers/AppProviders.tsx`
- `src/components/login/LoginClient.tsx`
- `src/components/items/ItemsClient.tsx`
- `src/lib/msal/config.ts`
- `src/lib/config/client-env.ts`
- `src/lib/config/server-env.ts`
