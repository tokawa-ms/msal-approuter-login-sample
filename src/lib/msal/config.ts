import { LogLevel } from "@azure/msal-browser";
import { clientEnv } from "@/lib/config/client-env";

const authority = `https://login.microsoftonline.com/${clientEnv.NEXT_PUBLIC_AZURE_AD_TENANT_ID}`;

export const msalConfig = {
  auth: {
    clientId: clientEnv.NEXT_PUBLIC_AZURE_AD_CLIENT_ID,
    authority,
    redirectUri: clientEnv.NEXT_PUBLIC_AZURE_AD_REDIRECT_URI,
  },
  cache: {
    cacheLocation: "localStorage" as const,
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level: LogLevel, message: string) => {
        if (level === LogLevel.Error) {
          console.error("[MSAL]", message);
        }
      },
    },
  },
};

export const loginRequest = {
  scopes: ["openid", "profile", "email"],
};
