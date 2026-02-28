export const locales = ["bg", "en", "de"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "bg";
