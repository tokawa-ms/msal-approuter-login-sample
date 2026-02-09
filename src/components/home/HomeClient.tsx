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

  return (
    <div className="rounded-3xl border border-black/10 bg-white/80 p-6 shadow-lift">
      <h2 className="text-lg font-semibold text-ink">{dictionary.accountTitle}</h2>
      <p className="mt-2 text-sm text-ink/70">{dictionary.accountSignedIn}</p>
      <dl className="mt-4 grid gap-2 text-sm text-ink/80">
        <div>
          <dt className="font-medium">{dictionary.accountName}</dt>
          <dd>{account.name ?? "-"}</dd>
        </div>
        <div>
          <dt className="font-medium">{dictionary.accountUsername}</dt>
          <dd>{account.username}</dd>
        </div>
        <div>
          <dt className="font-medium">{dictionary.accountTenant}</dt>
          <dd>{account.tenantId ?? "-"}</dd>
        </div>
      </dl>
    </div>
  );
}
