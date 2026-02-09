"use client";

import { useEffect } from "react";
import { MsalProvider } from "@azure/msal-react";
import { msalInstance } from "@/lib/msal/instance";

type AppProvidersProps = {
  children: React.ReactNode;
};

export default function AppProviders({ children }: AppProvidersProps) {
  useEffect(() => {
    msalInstance
      .handleRedirectPromise()
      .catch((error) => console.error("MSAL redirect error", error));
  }, []);

  return <MsalProvider instance={msalInstance}>{children}</MsalProvider>;
}
