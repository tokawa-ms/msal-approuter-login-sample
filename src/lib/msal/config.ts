"use client";
import { clientEnv } from "@/lib/config/client-env";

const authority = `https://login.microsoftonline.com/${clientEnv.NEXT_PUBLIC_AZURE_AD_TENANT_ID}`;

const LogLevel = {
  Error: 0,
  Warning: 1,
  Info: 2,
  Verbose: 3,
} as const;

type LogLevel = (typeof LogLevel)[keyof typeof LogLevel];

export const msalConfig = {
  auth: {
    clientId: clientEnv.NEXT_PUBLIC_AZURE_AD_CLIENT_ID,
    authority,
    redirectUri: clientEnv.NEXT_PUBLIC_AZURE_AD_REDIRECT_URI,
    postLogoutRedirectUri: "/",
    navigateToLoginRequestUrl: true,
  },
  cache: {
    cacheLocation: "sessionStorage" as const,
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      logLevel: LogLevel.Verbose,
      loggerCallback: (level: LogLevel, message: string) => {
        switch (level) {
          case LogLevel.Error:
            console.error("[MSAL]", message);
            break;
          case LogLevel.Warning:
            console.warn("[MSAL]", message);
            break;
          case LogLevel.Info:
            console.info("[MSAL]", message);
            break;
          default:
            console.debug("[MSAL]", message);
        }
      },
    },
  },
};

export const loginRequest = {
  scopes: ["openid", "profile", "email"],
};
