import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";
import { locales, type Locale } from "./config";

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  let locale = cookieStore.get("NEXT_LOCALE")?.value;
  if (!locale || !locales.includes(locale as Locale)) {
    locale = "bg";
  }
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
