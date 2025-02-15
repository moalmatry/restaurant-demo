import OrderCard from "@/components/HomeScreen/OrderCard";
import NoResults from "@/components/NoResults";
import { useGetOrders } from "@/hooks/useGetOrders";
import { router } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, FlatList } from "react-native";
import Toast from "react-native-toast-message";

const OrdersCardsList = () => {
  const { t } = useTranslation();
  const { orders, isLoading } = useGetOrders();
  const [fakePickup, setFakePickup] = useState(orders);

  const sendSmsHandler = async (id: string) => {
    // NOTE: Simulate calling api

    console.log(id);
    Toast.show({
      type: "info",
      text1: t("homeScreen.smsSentSuccessfully"),
    });
  };

  const pickupOrderHandler = (id: string) => {
    // NOTE: Simulate calling api
    setFakePickup((prev) => prev.filter((order) => order.id !== id));
    Toast.show({
      type: "success",
      text1: t("homeScreen.pickupSuccessfully"),
    });
  };

  return (
    <FlatList
      data={fakePickup}
      keyExtractor={(order) => order.id}
      renderItem={({ item }) => {
        const orderStatus =
          item.orderType === "Delivery"
            ? t("homeScreen.delivery")
            : item.orderType === "Pickup"
            ? t("homeScreen.pickup")
            : t("homeScreen.table");
        return (
          <OrderCard
            orderStatus={orderStatus as "Delivery"}
            orderTime={item.time}
            pickupButtonHandler={() => pickupOrderHandler(item.id)}
            pickupButtonStatus={item.status === "Ready" ? "active" : "disabled"}
            smsButtonHandler={() => sendSmsHandler(item.id)}
            smsButtonStatus={item.status === "Pending" ? "active" : "disabled"}
            waiterName={item.waiterName}
            onPress={() => {
              router.push(`/(root)/order-details/${item.id}`);
            }}
          />
        );
      }}
      ListEmptyComponent={
        isLoading ? (
          <ActivityIndicator size="large" className="text-primary-100 mt-5" />
        ) : (
          <NoResults />
        )
      }
      contentContainerClassName="pb-32"
      showsVerticalScrollIndicator={false}
    />
  );
};

export default OrdersCardsList;
