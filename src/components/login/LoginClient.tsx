"use client";

import Link from "next/link";
import { useState } from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "@/lib/msal/config";
import { ResourceKey } from "@/lib/i18n/resources";

type LoginClientProps = {
  dictionary: Record<ResourceKey, string>;
};

export default function LoginClient({ dictionary }: LoginClientProps) {
  const { instance, accounts, inProgress } = useMsal();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const account = accounts[0];
  const isBusy = inProgress !== "none";

  const handleLogin = async () => {
    try {
      if (isBusy || isLoggingIn) {
        return;
      }
      setIsLoggingIn(true);
      setErrorMessage(null);
      await instance.loginRedirect(loginRequest);
    } catch (error) {
      console.error("Login failed", error);
      setErrorMessage(dictionary.loginError);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await instance.logoutRedirect({
      postLogoutRedirectUri: "/",
    });
  };

  return (
    <div className="rounded-3xl border border-black/10 bg-white/85 p-8 shadow-lift">
      <div className="flex flex-col gap-4">
        <div className="rounded-2xl border border-dashed border-ink/20 bg-white/60 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ink/60">
            {dictionary.loginCtaTitle}
          </p>
          <p className="mt-2 text-sm text-ink/70">{dictionary.loginCtaBody}</p>
        </div>
        {account ? (
          <div className="flex flex-col gap-3">
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
          <div className="rounded-2xl border border-[rgba(255,107,92,0.35)] bg-[rgba(255,107,92,0.12)] p-4">
            <div className="flex flex-col gap-2">
              <button
                type="button"
                className="inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-[var(--accent)] px-5 py-4 text-sm font-semibold text-white shadow-lift transition hover:bg-[var(--accent-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lagoon/60 disabled:cursor-not-allowed disabled:opacity-60"
                onClick={handleLogin}
                disabled={isBusy || isLoggingIn}
                aria-busy={isBusy || isLoggingIn}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-5 w-5 fill-white"
                  >
                    <path d="M4 5h7v6H4V5zm9 0h7v6h-7V5zM4 13h7v6H4v-6zm9 0h7v6h-7v-6z" />
                  </svg>
                </span>
                <span>{dictionary.loginButton}</span>
              </button>
              {isBusy || isLoggingIn ? (
                <span className="text-xs text-ink/60">{dictionary.loginInProgress}</span>
              ) : null}
            </div>
          </div>
        )}
        {errorMessage ? (
          <p className="text-sm text-red-600">{errorMessage}</p>
        ) : null}
      </div>
      <div className="mt-6">
        <Link
          className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-sm font-semibold text-ink/80 transition hover:border-ink/30 hover:text-ink"
          href="/"
        >
          {dictionary.accountBackHome}
        </Link>
      </div>
    </div>
  );
}
