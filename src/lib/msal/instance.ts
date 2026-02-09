"use client";

import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "@/lib/msal/config";

export const msalInstance = new PublicClientApplication(msalConfig);
