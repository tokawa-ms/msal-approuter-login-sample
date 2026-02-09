import { NextRequest, NextResponse } from "next/server";
import { defaultLocale } from "@/lib/i18n/resources";
import { isLocale, localeCookieName } from "@/lib/i18n/locale";

export const GET = (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const nextLocale = searchParams.get("lang");
  const rawRedirect = searchParams.get("redirect") ?? "/";
  const locale = isLocale(nextLocale) ? nextLocale : defaultLocale;

  // Prevent open-redirect: only allow relative paths on the same origin.
  const safeRedirect = rawRedirect.startsWith("/") && !rawRedirect.startsWith("//") ? rawRedirect : "/";

  const response = NextResponse.redirect(new URL(safeRedirect, request.url));
  response.cookies.set(localeCookieName, locale, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return response;
};
