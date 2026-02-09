"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "@/lib/msal/config";
import { ResourceKey } from "@/lib/i18n/resources";

type LoginClientProps = {
  dictionary: Record<ResourceKey, string>;
};

export default function LoginClient({ dictionary }: LoginClientProps) {
  const router = useRouter();
  const { instance, accounts } = useMsal();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const account = accounts[0];

  const handleLogin = async () => {
    try {
      setErrorMessage(null);
      await instance.loginPopup(loginRequest);
      router.push("/");
    } catch (error) {
      console.error("Login failed", error);
      setErrorMessage(dictionary.loginError);
    }
  };

  const handleLogout = async () => {
    await instance.logoutRedirect({
      postLogoutRedirectUri: "/",
    });
  };

  return (
    <div className="rounded-3xl border border-black/10 bg-white/80 p-6 shadow-lift">
      <p className="text-sm text-ink/70">{dictionary.loginLead}</p>
      {account ? (
        <div className="mt-4 flex flex-col gap-3">
          <span className="text-sm font-medium text-ink">
            {dictionary.loginSuccess}
          </span>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-ink/20 px-4 py-2 text-sm font-semibold text-ink"
            onClick={handleLogout}
          >
            {dictionary.navLogout}
          </button>
        </div>
      ) : (
        <button
          type="button"
          className="mt-4 inline-flex items-center justify-center rounded-full bg-coral px-4 py-2 text-sm font-semibold text-white shadow-lift"
          onClick={handleLogin}
        >
          {dictionary.loginButton}
        </button>
      )}
      {errorMessage ? (
        <p className="mt-3 text-sm text-red-600">{errorMessage}</p>
      ) : null}
      <div className="mt-6">
        <Link className="text-sm font-medium text-ink" href="/">
          {dictionary.accountBackHome}
        </Link>
      </div>
    </div>
  );
}
