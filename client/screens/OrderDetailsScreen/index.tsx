import Accordion from "@/components/Accordion";
import ClientName from "@/components/OrderDetailsScreen/ClientName";
import OrderStatus from "@/components/OrderDetailsScreen/OrderStatus";
import { useGetOrder } from "@/hooks/useGetOrder";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native";
import LoadingScreen from "../LoadingScreen";
import { ScrollView } from "react-native-gesture-handler";
import { useAppDispatch } from "@/store/store";
import { addOrderId } from "@/store/features/order/order-slice";

const OrderDetailsScreen = () => {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const dispatch = useAppDispatch();
  const { order } = useGetOrder(id!);

  useEffect(() => {
    dispatch(addOrderId(id!));
  }, [id]);

  if (!order) <LoadingScreen />;
  return (
    <SafeAreaView className=" bg-gray-100 flex-1 items-center">
      <ScrollView>
        <ClientName
          name={order?.clientName as string}
          phone={order?.clientNumber as string}
        />
        <OrderStatus
          time={order?.time as string}
          orderPrice={`${order?.price}`}
          orderType={`${order?.orderType}`}
        />
        {/* <CardLayout className="h-auto w-[355px]"></CardLayout> */}
        <Accordion items={order?.items} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderDetailsScreen;
