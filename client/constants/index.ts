/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const black = {
  DEFAULT: "#000000",
  100: "#8C8E98",
  200: "#666876",
  300: "#191D31",
} as const;

export const Colors = {
  primary: "rgba(234, 55, 74, 1)",
  secondary: "#29376B",
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
};

export const ID_KEY = "ID";
export const PHONE_KEY = "PHONE";
export const TOKEN_KEY = "TOKEN";
export const NAME_KEY = "NAME";
export const PROFILE_IMG_KEY = "PROFILE_IMG";
export const LANGUAGE = "LANGUAGE";
export const Direction = "Direction";
export const API_LINK = "http://192.168.1.7:7000/api/v1";
