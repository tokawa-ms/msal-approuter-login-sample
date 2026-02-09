"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";
import { graphScopes } from "@/lib/msal/config";
import { clientEnv } from "@/lib/config/client-env";
import { ResourceKey } from "@/lib/i18n/resources";

type ItemsClientProps = {
  dictionary: Record<ResourceKey, string>;
};

type DebugInfo = {
  tid?: string;
  upn?: string;
  oid?: string;
  scp?: string;
  appid?: string;
};

type ProfileInfo = {
  displayName?: string;
  userPrincipalName?: string;
  mail?: string;
  jobTitle?: string;
  officeLocation?: string;
  mobilePhone?: string;
};

const decodeJwtPayload = (token: string): Record<string, unknown> | null => {
  try {
    const payload = token.split(".")[1];
    if (!payload) {
      return null;
    }
    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized + "=".repeat((4 - (normalized.length % 4)) % 4);
    const json = atob(padded);
    return JSON.parse(json) as Record<string, unknown>;
  } catch {
    return null;
  }
};

export default function ItemsClient({ dictionary }: ItemsClientProps) {
  const { instance, accounts, inProgress } = useMsal();
  const account = accounts[0];
  const [profile, setProfile] = useState<ProfileInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [needsConsent, setNeedsConsent] = useState(false);
  const [debugInfo, setDebugInfo] = useState<DebugInfo | null>(null);
  const consentLabel = dictionary.itemsConsentAction || "Grant permission";
  const debugEnabled = clientEnv.NEXT_PUBLIC_DEBUG_TOKEN === "1";

  useEffect(() => {
    let isActive = true;
    const controller = new AbortController();

    const loadProfile = async () => {
      if (!account) {
        setLoading(false);
        setProfile(null);
        setError(null);
        setNeedsConsent(false);
        setDebugInfo(null);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        setNeedsConsent(false);

        const token = await instance.acquireTokenSilent({
          account,
          scopes: graphScopes,
        });

        if (debugEnabled) {
          const claims = decodeJwtPayload(token.accessToken);
          setDebugInfo(
            claims
              ? {
                  tid: typeof claims.tid === "string" ? claims.tid : undefined,
                  upn:
                    typeof claims.upn === "string"
                      ? claims.upn
                      : typeof claims.preferred_username === "string"
                        ? claims.preferred_username
                        : undefined,
                  oid: typeof claims.oid === "string" ? claims.oid : undefined,
                  scp: typeof claims.scp === "string" ? claims.scp : undefined,
                  appid: typeof claims.appid === "string" ? claims.appid : undefined,
                }
              : null
          );
        } else {
          setDebugInfo(null);
        }

        const response = await fetch("https://graph.microsoft.com/v1.0/me", {
          headers: {
            Authorization: `Bearer ${token.accessToken}`,
          },
          cache: "no-store",
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Graph API error: ${response.status}`);
        }

        const data = (await response.json()) as ProfileInfo;

        if (isActive) {
          setProfile({
            displayName: data.displayName,
            userPrincipalName: data.userPrincipalName,
            mail: data.mail,
            jobTitle: data.jobTitle,
            officeLocation: data.officeLocation,
            mobilePhone: data.mobilePhone,
          });
        }
      } catch (err) {
        if (!isActive) {
          return;
        }

        const errorCode = (err as { errorCode?: string })?.errorCode;
        const errorName = (err as { name?: string })?.name;

        if (errorCode === "interaction_required" || errorName === "InteractionRequiredAuthError") {
          setNeedsConsent(true);
          setError(dictionary.itemsConsentNeeded);
          return;
        }

        console.error("Failed to load profile", err);
        setError(dictionary.itemsError);
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    loadProfile().catch((err) => console.error(err));

    return () => {
      isActive = false;
      controller.abort();
    };
  }, [account, dictionary.itemsConsentNeeded, dictionary.itemsError, dictionary.itemsNoPhoto, instance]);

  const handleConsent = async () => {
    if (inProgress !== "none") {
      return;
    }
    await instance.acquireTokenRedirect({
      scopes: graphScopes,
      account: account ?? undefined,
      prompt: "consent",
    });
  };

  if (!account) {
    return (
      <div className="rounded-3xl border border-black/10 bg-white/80 p-6 shadow-lift">
        <p className="text-sm text-ink/70">{dictionary.itemsRequiresLogin}</p>
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
      {loading ? <p className="text-sm text-ink/70">{dictionary.itemsLoading}</p> : null}
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      {needsConsent ? (
        <button
          type="button"
          className="mt-4 inline-flex items-center justify-center rounded-full bg-black px-4 py-2 text-sm font-semibold text-white"
          onClick={handleConsent}
          disabled={inProgress !== "none"}
        >
          {consentLabel}
        </button>
      ) : null}
      {profile ? (
        <div className="mt-6 rounded-2xl border border-ink/10 bg-white/70 p-4 text-sm text-ink/80">
          <p className="text-sm font-medium text-ink">{dictionary.itemsProfileTitle}</p>
          <dl className="mt-3 grid gap-2">
            <div>
              <dt className="font-medium">{dictionary.itemsProfileName}</dt>
              <dd>{profile.displayName ?? "-"}</dd>
            </div>
            <div>
              <dt className="font-medium">{dictionary.itemsProfileUpn}</dt>
              <dd>{profile.userPrincipalName ?? "-"}</dd>
            </div>
            <div>
              <dt className="font-medium">{dictionary.itemsProfileMail}</dt>
              <dd>{profile.mail ?? "-"}</dd>
            </div>
            <div>
              <dt className="font-medium">{dictionary.itemsProfileJobTitle}</dt>
              <dd>{profile.jobTitle ?? "-"}</dd>
            </div>
            <div>
              <dt className="font-medium">{dictionary.itemsProfileOffice}</dt>
              <dd>{profile.officeLocation ?? "-"}</dd>
            </div>
            <div>
              <dt className="font-medium">{dictionary.itemsProfileMobile}</dt>
              <dd>{profile.mobilePhone ?? "-"}</dd>
            </div>
          </dl>
        </div>
      ) : null}
      {debugEnabled ? (
        <div className="mt-6 rounded-2xl border border-ink/10 bg-white/70 p-4 text-xs text-ink/80">
          <p className="text-sm font-medium text-ink">{dictionary.itemsDebugTitle}</p>
          <p className="mt-1 text-xs text-ink/60">{dictionary.itemsDebugHint}</p>
          {debugInfo ? (
            <dl className="mt-3 grid gap-2">
              <div>
                <dt className="font-medium">{dictionary.itemsDebugTenant}</dt>
                <dd>{debugInfo.tid ?? "-"}</dd>
              </div>
              <div>
                <dt className="font-medium">{dictionary.itemsDebugUpn}</dt>
                <dd>{debugInfo.upn ?? "-"}</dd>
              </div>
              <div>
                <dt className="font-medium">{dictionary.itemsDebugOid}</dt>
                <dd>{debugInfo.oid ?? "-"}</dd>
              </div>
              <div>
                <dt className="font-medium">{dictionary.itemsDebugAppId}</dt>
                <dd>{debugInfo.appid ?? "-"}</dd>
              </div>
              <div>
                <dt className="font-medium">{dictionary.itemsDebugScopes}</dt>
                <dd className="break-words">{debugInfo.scp ?? "-"}</dd>
              </div>
            </dl>
          ) : (
            <p className="mt-3 text-xs text-ink/60">{dictionary.itemsDebugNoData}</p>
          )}
        </div>
      ) : null}
    </div>
  );
}
