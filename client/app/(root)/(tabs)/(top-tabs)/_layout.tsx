import { Colors } from "@/constants";
import i18nLocale from "@/lib/locales/i18n";
import { MaterialTopTabs } from "@/navigation/top-tabs";
import React from "react";
import { useTranslation } from "react-i18next";

const TopTabsStack = () => {
  const dir = i18nLocale.dir();
  const { t } = useTranslation();
  // const { loading, isLoggedIn } = useGlobalContext();

  // if (loading) {
  //   return <LoadingScreen />;
  // }

  return (
    <MaterialTopTabs
      style={{ direction: dir === "rtl" ? "rtl" : "ltr" }}
      screenOptions={{
        // ShadowVisible: false,
        tabBarStyle: {
          shadowColor: "transparent",
        },
        tabBarIndicatorStyle: {
          backgroundColor: Colors.secondary,
        },
      }}
    >
      <MaterialTopTabs.Screen
        name="index"
        options={{
          title: t("homeScreen.home"),
        }}
      />
      <MaterialTopTabs.Screen
        name="ready"
        options={{
          title: t("homeScreen.ready"),
        }}
      />
    </MaterialTopTabs>
  );
};
export default TopTabsStack;
