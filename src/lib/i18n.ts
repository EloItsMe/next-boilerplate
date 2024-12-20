import merge from "deepmerge-json";
import fs from "fs";
import { getRequestConfig } from "next-intl/server";
import { headers } from "next/headers";
import path from "path";

const availableLocales = ["en", "fr"] as const;
const defaultLocale = "en" as const;

export default getRequestConfig(async () => {
  const locale = await _getLocale();
  const messages = _loadI18nTranslations("./locales", locale);

  return {
    locale,
    messages: messages,
  };
});

const _getLocale = async () => {
  const headersList = await headers();
  const acceptLanguage = headersList.get("accept-language");
  const userPreferedLanguage = acceptLanguage?.split(",")[0]?.split("-")[0];
  return availableLocales.includes(userPreferedLanguage as any)
    ? (userPreferedLanguage as (typeof availableLocales)[number])
    : defaultLocale;
};

const _loadI18nTranslations = (dictionariesPath: string, locale: string) => {
  const absolutePath = path.join(process.cwd(), dictionariesPath);

  let translations = {};

  try {
    const files = fs.readdirSync(absolutePath, { recursive: true });

    files.forEach((file) => {
      if (typeof file === "string" && file.endsWith(`${locale}.json`)) {
        const filePath = path.join(absolutePath, file);
        const fileTranslations = JSON.parse(fs.readFileSync(filePath, "utf-8"));

        translations = merge(translations, fileTranslations);
      }
    });
  } catch (error) {
    console.error(
      "The following error occured in loader in next-intl-split.",
      error
    );
  }

  return translations;
};
