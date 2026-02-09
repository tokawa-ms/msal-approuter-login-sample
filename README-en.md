# MSAL.js + App Router Login Sample

[日本語](README.md) | English

![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?logo=tailwindcss&logoColor=white)
![MSAL.js](https://img.shields.io/badge/MSAL.js-5E5E5E?logo=microsoft&logoColor=white)
![Microsoft Graph](https://img.shields.io/badge/Microsoft%20Graph-5E5E5E?logo=microsoft&logoColor=white)
![Azure Container Apps](https://img.shields.io/badge/Azure%20Container%20Apps-0078D4?logo=microsoftazure&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)

## Overview

This is a Next.js (App Router) MPA that uses **MSAL.js** for Microsoft Entra ID login and Microsoft Graph API to fetch your **profile details**. It serves pages and API routes in a single Node.js process, designed for Azure Container Apps with a single container.

## Pages

- `/` Home (visible without login)
- `/login` Login page
- `/about` About this app
- `/items` Microsoft Graph profile details
- `/settings` Settings

## Key Features

- MSAL.js sign-in with Microsoft Entra ID
- Microsoft Graph API for the signed-in profile details
- Language switch via `/api/lang` (cookie-based, no middleware)
- Health check API: `/api/health`

## Documentation

- For implementation details, auth flow, and configuration, see [/docs/README.md](docs/README.md).
- English version: [/docs/README-en.md](docs/README-en.md)

## Prerequisites

- Node.js 20 LTS or later
- Docker
- Azure CLI (only if needed for local development)

## Setup

1. Create the environment file

```
cp .env.template .env
```

2. Fill in required values

| Variable                                | Description                                                  |
| --------------------------------------- | ------------------------------------------------------------ |
| `PORT`                                  | Port to listen on (e.g., 3000)                               |
| `NODE_ENV`                              | `development` / `production`                                 |
| `NEXT_PUBLIC_AZURE_AD_CLIENT_ID`        | Entra ID application (client) ID                             |
| `NEXT_PUBLIC_AZURE_AD_TENANT_ID`        | Entra ID directory (tenant) ID                               |
| `NEXT_PUBLIC_AZURE_AD_REDIRECT_URI`     | Redirect URI (e.g., `http://localhost:3000/auth/popup.html`) |
| `APPLICATIONINSIGHTS_CONNECTION_STRING` | (Optional) App Insights connection string                    |

3. Install dependencies

```
npm install
```

4. Start the dev server

```
npm run dev
```

## Microsoft Entra ID Setup

1. Create an app registration in Entra ID
2. Add `http://localhost:3000/auth/popup.html` as a redirect URI
3. Add `https://<your-domain>/auth/popup.html` for production

## Microsoft Graph Setup

- Add Microsoft Graph `User.Read` permission in the Entra ID app registration
- A consent prompt appears on first use

## Docker

```
docker build -t msal-app-test .
docker run --rm -p 3000:3000 -e PORT=3000 --env-file .env msal-app-test
```

## Azure Container Apps Deployment (High-Level)

1. Create Container Apps environment and ACR if needed
2. Build and push the image to ACR
3. Create Container App with environment variables
4. Enable managed identity if needed

## Notes

- MSAL uses `loginRedirect` for the sign-in flow
- Language switching is handled through `/api/lang` (cookie-based proxy)
- The profile details flow shows a message if Graph consent is required
