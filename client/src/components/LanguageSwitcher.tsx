"use client";

import React from "react";
import { useLocale } from "next-intl";
import { locales, type Locale } from "@/i18n/config";

const LOCALE_LABELS: Record<Locale, string> = {
  bg: "БГ",
  en: "EN",
  de: "DE",
};

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;

  const setLocale = (newLocale: Locale) => {
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000`;
    window.location.reload();
  };

  return (
    <div className="fixed right-4 top-[240px] z-40 flex flex-col gap-1">
      {locales.map((l) => (
        <button
          key={l}
          onClick={() => setLocale(l)}
          className={`px-3 py-1.5 text-sm font-medium rounded transition-colors w-12 ${
            locale === l
              ? "bg-emerald-600 text-white"
              : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
          }`}
        >
          {LOCALE_LABELS[l]}
        </button>
      ))}
    </div>
  );
}
