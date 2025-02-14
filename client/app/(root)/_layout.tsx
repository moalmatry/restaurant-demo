import Header from "@/components/Header";
import PrimaryButton from "@/components/PrimaryButton";
import i18nLocale from "@/lib/locales/i18n";
import { setDir } from "@/util";
import { Stack } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";

const AppLayout = () => {
  const dir = i18nLocale.dir();
  const { t } = useTranslation();

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
          animation: "slide_from_right",
          headerShown: true,
          header: () => (
            <Header
              className={`bg-gray-100 px-4 ${setDir(dir)}`}
              left={
                <PrimaryButton
                  textClassName="text-lg"
                  className="p-0 w-[125px] h-[35px]"
                  title={t("orderDetailsScreen.refund")}
                />
              }
              rightTitle={t("orderDetailsScreen.orderDetails")}
            />
          ),
        }}
      />
    </Stack>
  );
};
export default AppLayout;
