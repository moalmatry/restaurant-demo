import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import "./global.css";
// import GlobalProvider from "@/lib/global-provider";

import Toast from "react-native-toast-message";
import SessionProvider from "@/providers/session-provider";
import ReduxProvider from "@/providers/redux-provider";
import BottomSheetProvider from "@/providers/bottom-sheet-provider";

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
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ReduxProvider>
      <SessionProvider>
        <BottomSheetProvider>
          <Stack screenOptions={{ headerShown: false }}>
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
        </BottomSheetProvider>
      </SessionProvider>
    </ReduxProvider>
  );
};
export default Layout;
