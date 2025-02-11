import TabIcon from "@/components/TabIcon";
import TobTabsHeader from "@/components/TopTabsHeader";
import icons from "@/constants/icons";
import { Tabs } from "expo-router";
import React from "react";

const TabsLayout = () => {
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
          headerShown: true,
          headerShadowVisible: false,
          header: () => <TobTabsHeader />,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.homeSmile} focused={focused} title="Home" />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.settings} focused={focused} title="Settings" />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
