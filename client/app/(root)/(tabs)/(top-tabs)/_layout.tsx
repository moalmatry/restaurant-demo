import { Colors } from "@/constants";
import { MaterialTopTabs } from "@/navigation/top-tabs";
import React from "react";

const TopTabsStack = () => {
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
          title: "Home",
        }}
      />
      <MaterialTopTabs.Screen
        name="ready"
        options={{
          title: "Ready",
        }}
      />
    </MaterialTopTabs>
  );
};
export default TopTabsStack;
