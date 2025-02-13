import { Href } from "expo-router";
import icons from "./icons";
import i18nLocale from "@/lib/locales/i18n";
export interface ISettings {
  title: string;
  icon: any;
  href: Href;
}
export const settings: Array<ISettings> = [
  {
    title: i18nLocale.t("settingsScreen.personalDetails"),
    icon: icons.person,
    href: "/(root)/(tabs)/(top-tabs)",
  },
  {
    title: i18nLocale.t("settingsScreen.notifications"),
    icon: icons.bell,
    href: "/",
  },
  {
    title: i18nLocale.t("settingsScreen.security"),
    icon: icons.shield,
    href: "/(root)/(tabs)/(top-tabs)",
  },
  // {
  //   title: "Language",
  //   icon: icons.language,
  // },
  {
    title: i18nLocale.t("settingsScreen.helpCenter"),
    icon: icons.info,
    href: "/(root)/(tabs)/(top-tabs)",
  },
  // {
  //   title: "Invite Friends",
  //   icon: icons.people,
  // },
];

export const languages = [
  {
    id: "1",
    label: "Arabic",
    value: "ar",
    icon: icons.egypt,
  },
  {
    id: "2",
    label: "English",
    value: "en",
    icon: icons.us,
  },
];
