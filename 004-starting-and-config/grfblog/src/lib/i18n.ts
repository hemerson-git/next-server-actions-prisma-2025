import { getRequestConfig } from "next-intl/server";
import { intl } from "@/config/intl";
import { notFound } from "next/navigation";

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;

  if (!intl.locales.includes(String(locale)) || !locale) notFound();

  return {
    locale,
    messages: (await import(`../langs/${locale}.json`)).default,
  };
});
