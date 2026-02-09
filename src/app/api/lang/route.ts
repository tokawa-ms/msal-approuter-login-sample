import { NextRequest, NextResponse } from "next/server";
import { defaultLocale } from "@/lib/i18n/resources";
import { isLocale, localeCookieName } from "@/lib/i18n/locale";

export const GET = (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const nextLocale = searchParams.get("lang");
  const rawRedirect = searchParams.get("redirect") ?? "/";
  const locale = isLocale(nextLocale) ? nextLocale : defaultLocale;

  // Prevent open-redirect: only allow paths on the same origin.
  let safeRedirect = "/";
  try {
    const target = new URL(rawRedirect, request.url);
    const origin = new URL(request.url).origin;
    if (target.origin === origin) {
      safeRedirect = rawRedirect;
    }
  } catch {
    // invalid URL – fall back to "/"
  }

  const response = NextResponse.redirect(new URL(safeRedirect, request.url));
  response.cookies.set(localeCookieName, locale, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return response;
};
