import { Colors } from "@/constants";
import { MaterialTopTabs } from "@/navigation/top-tabs";
import React from "react";
import { useTranslation } from "react-i18next";

const TopTabsStack = () => {
  const { t } = useTranslation();
  // const { loading, isLoggedIn } = useGlobalContext();

  // if (loading) {
  //   return <LoadingScreen />;
  // }

  return (
    <MaterialTopTabs
      screenOptions={{
        // ShadowVisible: false,

        tabBarStyle: {
          shadowColor: "transparent",
        },

        tabBarIndicatorStyle: { backgroundColor: Colors.secondary },
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
