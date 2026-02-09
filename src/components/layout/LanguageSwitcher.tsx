"use client";

import { useMemo, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Locale, ResourceKey, localeLabels } from "@/lib/i18n/resources";

type LanguageSwitcherProps = {
  currentLocale: Locale;
  dictionary: Record<ResourceKey, string>;
};

export default function LanguageSwitcher({ currentLocale, dictionary }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState<Locale>(currentLocale);

  const redirect = useMemo(() => {
    const query = searchParams?.toString();
    return query ? `${pathname}?${query}` : pathname;
  }, [pathname, searchParams]);

  const handleChange = (nextLocale: Locale) => {
    setValue(nextLocale);
    const params = new URLSearchParams({ lang: nextLocale, redirect });
    window.location.href = `/api/lang?${params.toString()}`;
  };

  return (
    <label className="flex items-center gap-2 text-sm font-medium text-ink">
      <span className="sr-only">{dictionary.languageLabel}</span>
      <select
        aria-label={dictionary.languageLabel}
        className="rounded-full border border-ink/10 bg-white/80 px-3 py-1.5 text-sm shadow-sm"
        value={value}
        onChange={(event) => handleChange(event.target.value as Locale)}
      >
        {Object.entries(localeLabels).map(([key, label]) => (
          <option key={key} value={key}>
            {label}
          </option>
        ))}
      </select>
    </label>
  );
}
