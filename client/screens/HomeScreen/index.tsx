import OrderCard from "@/components/HomeScreen/OrderCard";
import React from "react";
import { SafeAreaView } from "react-native";

const HomeScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-100 items-center">
      <OrderCard
        orderStatus="Delivery"
        orderTime="20:10"
        pickupButtonHandler={() => {}}
        pickupButtonStatus="active"
        smsButtonHandler={() => {}}
        smsButtonStatus="disabled"
        waiterName="S42"
      />
      <OrderCard
        orderStatus="Pickup"
        orderTime="10:10"
        pickupButtonHandler={() => {}}
        pickupButtonStatus="disabled"
        smsButtonHandler={() => {}}
        smsButtonStatus="active"
        waiterName="TX-1231"
      />
      <OrderCard
        orderStatus="Table"
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
