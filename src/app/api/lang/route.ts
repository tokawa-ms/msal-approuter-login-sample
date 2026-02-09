import { NextRequest, NextResponse } from "next/server";
import { defaultLocale } from "@/lib/i18n/resources";
import { isLocale, localeCookieName } from "@/lib/i18n/locale";

export const GET = (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const nextLocale = searchParams.get("lang");
  const redirectTo = searchParams.get("redirect") ?? "/";
  const locale = isLocale(nextLocale) ? nextLocale : defaultLocale;

  const response = NextResponse.redirect(new URL(redirectTo, request.url));
  response.cookies.set(localeCookieName, locale, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return response;
};
