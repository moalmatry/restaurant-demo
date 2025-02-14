import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import "./global.css";
// import GlobalProvider from "@/lib/global-provider";

import { LANGUAGE } from "@/constants";
import { readData } from "@/lib/locale-storage/readData";
import BottomSheetProvider from "@/providers/bottom-sheet-provider";
import ReduxProvider from "@/providers/redux-provider";
import SessionProvider from "@/providers/session-provider";
import { getLocales } from "expo-localization";
import { I18nManager } from "react-native";
import Toast from "react-native-toast-message";
import "../lib/locales/i18n";
import { setLocale } from "../lib/locales/i18n";

const Layout = () => {
  const [fontsLoaded] = useFonts({
    "Rubik-Bold": require("../assets/fonts/Rubik-Bold.ttf"),
    "Rubik-ExtraBold": require("../assets/fonts/Rubik-ExtraBold.ttf"),
    "Rubik-Light": require("../assets/fonts/Rubik-Light.ttf"),
    "Rubik-Medium": require("../assets/fonts/Rubik-Medium.ttf"),
    "Rubik-Regular": require("../assets/fonts/Rubik-Regular.ttf"),
    "Rubik-SemiBold": require("../assets/fonts/Rubik-SemiBold.ttf"),
  });

  useEffect(() => {
    const loadResources = async () => {
      const deviceLanguage = getLocales()[0].languageCode;
      const storedLanguage = await readData(LANGUAGE);
      if (storedLanguage) {
        setLocale(storedLanguage);
      } else {
        setLocale(deviceLanguage ?? "en");
      }

      I18nManager.allowRTL(true);

      if (fontsLoaded) {
        SplashScreen.hideAsync();
      }
    };

    loadResources();
  }, [fontsLoaded, I18nManager]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ReduxProvider>
      <SessionProvider>
        <BottomSheetProvider>
          {/* <I18nextProvider i18n={i18next}> */}
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen
              options={{
                animation: "slide_from_right",
              }}
              name="index"
            />
            <Stack.Screen
              options={{
                animation: "slide_from_right",
              }}
              name="confirmation-code"
            />

            <Stack.Screen name="(root)" />
          </Stack>
          <Toast />
          {/* </I18nextProvider> */}
        </BottomSheetProvider>
      </SessionProvider>
    </ReduxProvider>
  );
};
export default Layout;
