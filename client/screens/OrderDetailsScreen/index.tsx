import Accordion from "@/components/Accordion";
import ClientName from "@/components/OrderDetailsScreen/ClientName";
import OrderStatus from "@/components/OrderDetailsScreen/OrderStatus";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native";

const OrderDetailsScreen = () => {
  const { id } = useLocalSearchParams<{ id?: string }>();

  return (
    <SafeAreaView className=" bg-gray-100 flex-1 items-center">
      <ClientName name="TX-1231" phone="+201069605541" />
      <OrderStatus />
      {/* <CardLayout className="h-auto w-[355px]"></CardLayout> */}
      <Accordion title="Cheesy Buffalo Burger (2) " />
    </SafeAreaView>
  );
};

export default OrderDetailsScreen;
