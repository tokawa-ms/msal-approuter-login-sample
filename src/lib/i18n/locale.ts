import { cookies } from "next/headers";
import { defaultLocale, Locale } from "@/lib/i18n/resources";

export const localeCookieName = "app_lang";

export const isLocale = (value: string | null | undefined): value is Locale =>
  value === "ja" || value === "en";

export const getLocaleFromCookie = async (): Promise<Locale> => {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(localeCookieName)?.value;
  return isLocale(cookieValue) ? cookieValue : defaultLocale;
};
