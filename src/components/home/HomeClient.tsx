"use client";

import Link from "next/link";
import { useMsal } from "@azure/msal-react";
import { ResourceKey } from "@/lib/i18n/resources";

type HomeClientProps = {
  dictionary: Record<ResourceKey, string>;
};

export default function HomeClient({ dictionary }: HomeClientProps) {
  const { accounts } = useMsal();
  const account = accounts[0];
  const idTokenClaims = account?.idTokenClaims ?? null;

  if (!account) {
    return (
      <div className="rounded-3xl border border-black/10 bg-white/80 p-6 shadow-lift">
        <h2 className="text-lg font-semibold text-ink">{dictionary.accountTitle}</h2>
        <p className="mt-2 text-sm text-ink/70">{dictionary.accountSignedOut}</p>
        <Link
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white"
          href="/login"
        >
          {dictionary.navLogin}
        </Link>
      </div>
    );
  }

  const sessionFields = [
    { label: dictionary.accountName, value: account.name ?? "-" },
    { label: dictionary.accountUsername, value: account.username ?? "-" },
    { label: dictionary.accountTenant, value: account.tenantId ?? "-" },
    { label: dictionary.accountHomeId, value: account.homeAccountId ?? "-" },
    { label: dictionary.accountLocalId, value: account.localAccountId ?? "-" },
    { label: dictionary.accountEnvironment, value: account.environment ?? "-" },
  ];

  const claimsText = idTokenClaims
    ? JSON.stringify(idTokenClaims, null, 2)
    : dictionary.accountClaimsEmpty;

  return (
    <div className="rounded-3xl border border-black/10 bg-white/80 p-6 shadow-lift">
      <h2 className="text-lg font-semibold text-ink">{dictionary.accountTitle}</h2>
      <p className="mt-2 text-sm text-ink/70">{dictionary.accountSignedIn}</p>
      <dl className="mt-4 grid gap-2 text-sm text-ink/80">
        {sessionFields.map((field) => (
          <div key={field.label}>
            <dt className="font-medium">{field.label}</dt>
            <dd>{field.value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-6">
        <p className="text-sm font-medium text-ink">{dictionary.accountClaimsTitle}</p>
        <p className="mt-1 text-xs text-ink/60">{dictionary.accountClaimsHint}</p>
        <pre className="mt-3 max-h-72 overflow-auto rounded-2xl border border-ink/10 bg-white/70 p-4 text-xs text-ink/80">
          {claimsText}
        </pre>
      </div>
    </div>
  );
}
