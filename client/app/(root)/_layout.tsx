import Header from "@/components/Header";
import PrimaryButton from "@/components/PrimaryButton";
import i18nLocale from "@/lib/locales/i18n";
import {
  setCurrentLocale,
  SupportedLocales,
} from "@/store/features/locale/locale-slice";
import { useAppDispatch } from "@/store/store";
import { Stack } from "expo-router";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

const AppLayout = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  // const { loading, isLoggedIn } = useGlobalContext();

  // if (loading) {
  //   return <LoadingScreen />;
  // }

  useEffect(() => {
    dispatch(setCurrentLocale(i18nLocale.language as SupportedLocales));
  }, []);
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
              className="bg-gray-100 px-4"
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
