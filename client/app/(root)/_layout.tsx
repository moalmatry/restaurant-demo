import Header from "@/components/Header";
import PrimaryButton from "@/components/PrimaryButton";
import i18nLocale from "@/lib/locales/i18n";
import { useAppSelector } from "@/store/store";
import { setDir } from "@/util";
import { router, Stack } from "expo-router";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

const AppLayout = () => {
  const token = useAppSelector((state) => state.auth.token);

  const dir = i18nLocale.dir();
  const { t } = useTranslation();

  // const { loading, isLoggedIn } = useGlobalContext();

  // if (loading) {
  //   return <LoadingScreen />;
  // }

  useEffect(() => {
    if (!token) router.replace("/");
  }, [token]);

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
