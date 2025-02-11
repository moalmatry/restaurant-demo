import { Href } from "expo-router";
import icons from "./icons";
export interface ISettings {
  title: string;
  icon: any;
  href: Href;
}

export const settings: Array<ISettings> = [
  {
    title: "Personal Details",
    icon: icons.person,
    href: "/(root)/(tabs)/(top-tabs)",
  },
  {
    title: "Notifications",
    icon: icons.bell,
    href: "/",
  },
  {
    title: "Security",
    icon: icons.shield,
    href: "/(root)/(tabs)/(top-tabs)",
  },
  // {
  //   title: "Language",
  //   icon: icons.language,
  // },
  {
    title: "Help Center",
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
