import Header from "@/components/Header";
import PrimaryButton from "@/components/PrimaryButton";
import { Stack } from "expo-router";
import React from "react";

const AppLayout = () => {
  // const { loading, isLoggedIn } = useGlobalContext();

  // if (loading) {
  //   return <LoadingScreen />;
  // }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="order-details/[id]"
        options={{
          headerShown: true,
          header: () => (
            <Header
              className="bg-gray-100 px-4"
              left={
                <PrimaryButton
                  textClassName="text-lg"
                  className="p-0 w-[125px] h-[35px]"
                  title="Refund"
                />
              }
              rightTitle="Order Details"
            />
          ),
        }}
      />
    </Stack>
  );
};
export default AppLayout;
