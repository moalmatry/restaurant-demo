import Header from "@/components/Header";
import PrimaryButton from "@/components/PrimaryButton";
import i18nLocale from "@/lib/locales/i18n";
import LoadingScreen from "@/screens/LoadingScreen";
import { useAppSelector } from "@/store/store";
import { setDir } from "@/util";
import { router, Stack } from "expo-router";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Toast from "react-native-toast-message";

const AppLayout = () => {
  const token = useAppSelector((state) => state.auth.token);
  const isLoading = useAppSelector((state) => state.auth.isLoading);
  const orderId = useAppSelector((state) => state.order.id);

  const dir = i18nLocale.dir();
  const { t } = useTranslation();

  // const { loading, isLoggedIn } = useGlobalContext();

  // if (loading) {
  //   return <LoadingScreen />;
  // }

  const refundOrderHandler = (id: string) => {
    // NOTE: not clear Full Refund button (requires managerial code).

    Toast.show({
      type: "success",
      text1: t("orderDetailsScreen.refundSuccess"),
    });
    console.log(id);

    router.back();
  };

  useEffect(() => {
    if (!token) router.replace("/");
  }, [token]);

  if (isLoading) return <LoadingScreen />;
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
                  onPress={() => refundOrderHandler(orderId)}
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
