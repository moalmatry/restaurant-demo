import { Stack } from "expo-router";
import React from "react";

const AppLayout = () => {
  // const { loading, isLoggedIn } = useGlobalContext();

  // if (loading) {
  //   return <LoadingScreen />;
  // }

  return <Stack screenOptions={{ headerShown: false }} />;
};
export default AppLayout;
