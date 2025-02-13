import OrderCard from "@/components/HomeScreen/OrderCard";
import { router } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native";

const HomeScreen = () => {
  const { t } = useTranslation();
  // const delivery = ;
  return (
    <SafeAreaView className="flex-1 bg-gray-100 items-center">
      <OrderCard
        orderStatus={t("homeScreen.delivery") as "Delivery"}
        orderTime="20:10"
        pickupButtonHandler={() => {}}
        pickupButtonStatus="active"
        smsButtonHandler={() => {}}
        smsButtonStatus="disabled"
        waiterName="S42"
        onPress={() => {
          router.push("/(root)/order-details/test");
        }}
      />
      <OrderCard
        orderStatus={t("homeScreen.pickup") as "Pickup"}
        orderTime="10:10"
        pickupButtonHandler={() => {}}
        pickupButtonStatus="disabled"
        smsButtonHandler={() => {}}
        smsButtonStatus="active"
        waiterName="TX-1231"
      />
      <OrderCard
        orderStatus={t("homeScreen.table") as "Table"}
        orderTime="7:00"
        pickupButtonHandler={() => {}}
        pickupButtonStatus="disabled"
        smsButtonHandler={() => {}}
        smsButtonStatus="active"
        waiterName="TX-66"
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
