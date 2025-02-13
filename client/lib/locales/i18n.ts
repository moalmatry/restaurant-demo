import i18nLocale from "i18next";

import { initReactI18next } from "react-i18next";
// import { getLocales } from "react-native-localize";
import { ar, en } from "./languages";

// Define the type for supported languages
export type TranslationKeys = keyof typeof en;

// Detect the device language
// const getDeviceLanguage = (): string => {
//   const locales = getLocales();
//   return locales[0]?.languageTag || "en";
// };

// Initialize i18next
i18nLocale.use(initReactI18next).init({
  compatibilityJSON: "v4",
  resources: {
    en: { translation: en },
    ar: { translation: ar },
  },
  fallbackLng: "ar",
  interpolation: {
    escapeValue: false,
  },
});

export default i18nLocale;
