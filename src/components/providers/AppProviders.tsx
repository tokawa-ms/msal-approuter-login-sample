"use client";

import { useEffect, useState } from "react";
import type { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";

type AppProvidersProps = {
  children: React.ReactNode;
};

export default function AppProviders({ children }: AppProvidersProps) {
  const [instance, setInstance] = useState<PublicClientApplication | null>(null);

  useEffect(() => {
    const initMsal = async () => {
      try {
        const [{ PublicClientApplication }, { msalConfig }] = await Promise.all([
          import("@azure/msal-browser"),
          import("@/lib/msal/config"),
        ]);

        const createdInstance = new PublicClientApplication(msalConfig);
        await createdInstance.initialize();

        const response = await createdInstance.handleRedirectPromise();
        if (response?.account) {
          createdInstance.setActiveAccount(response.account);
        }

        const accounts = createdInstance.getAllAccounts();
        if (!createdInstance.getActiveAccount() && accounts.length > 0) {
          createdInstance.setActiveAccount(accounts[0]);
        }

        setInstance(createdInstance);
      } catch (error) {
        console.error("MSAL redirect error", error);
      }
    };

    void initMsal();
  }, []);

  if (!instance) {
    return null;
  }

  return <MsalProvider instance={instance}>{children}</MsalProvider>;
}
