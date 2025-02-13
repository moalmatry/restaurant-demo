import TabIcon from "@/components/TabIcon";
import TobTabsHeader from "@/components/TopTabsHeader";
import icons from "@/constants/icons";
import { Tabs } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";

const TabsLayout = () => {
  const { t } = useTranslation();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,

        tabBarStyle: {
          backgroundColor: "white",
          position: "absolute",
          borderTopColor: "#0061FF1A",
          borderTopWidth: 1,
          minHeight: 79,
          borderTopEndRadius: 30,
          borderTopStartRadius: 30,
          // shadowRadius: 300,
          // shadowOffset: {
          //   height: 20,
          //   width: 30,
          // },
          // elevation: 30,
        },
      }}
    >
      <Tabs.Screen
        name="(top-tabs)"
        options={{
          animation: "shift",
          headerShown: true,
          headerShadowVisible: false,
          header: () => <TobTabsHeader />,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={icons.homeSmile}
              focused={focused}
              title={t("bottomTabs.home")}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          animation: "shift",
          title: "Settings",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={icons.settings}
              focused={focused}
              title={t("bottomTabs.settings")}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
