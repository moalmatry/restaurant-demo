import CardLayout from "@/components/ui/CardLayout";
import { black } from "@/constants";
import icons from "@/constants/icons";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image } from "react-native";
import Status from "./components";
import { useTranslation } from "react-i18next";

interface OrderStatusProps {
  time: string;
  orderType: string;
  orderPrice: string;
}

const OrderStatus = ({ orderPrice, orderType, time }: OrderStatusProps) => {
  const { t } = useTranslation();
  const orderStatus =
    orderType === "Delivery"
      ? t("homeScreen.delivery")
      : orderType === "Pickup"
      ? t("homeScreen.pickup")
      : t("homeScreen.table");
  return (
    <CardLayout className="h-auto w-[355px]">
      <Status
        firstTitle={t("orderDetailsScreen.orderedAt")}
        secondTitle={time}
        icon={<AntDesign name="clockcircleo" size={16} color={black[200]} />}
      />
      <Status
        firstTitle={t("orderDetailsScreen.orderType")}
        secondTitle={orderStatus}
        icon={
          <Ionicons
            name="checkbox-outline"
            className="text-black-300"
            size={15}
            color={black[200]}
          />
        }
      />
      <Status
        firstTitle={t("orderDetailsScreen.orderedPrice")}
        secondTitle={`${orderPrice} ${t("orderDetailsScreen.egp")}`}
        icon={<Image source={icons.price} />}
      />
    </CardLayout>
  );
};

export default OrderStatus;
