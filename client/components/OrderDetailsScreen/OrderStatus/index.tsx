import CardLayout from "@/components/ui/CardLayout";
import { black } from "@/constants";
import icons from "@/constants/icons";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image } from "react-native";
import Status from "./components";

const OrderStatus = () => {
  return (
    <CardLayout className="h-auto w-[355px]">
      <Status
        firstTitle="Ordered At"
        secondTitle="02:00 PM"
        icon={<AntDesign name="clockcircleo" size={16} color={black[200]} />}
      />
      <Status
        firstTitle="Ordered Type"
        secondTitle="Pickup"
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
        firstTitle="Ordered Price"
        secondTitle="2000 EGP"
        icon={<Image source={icons.price} />}
      />
    </CardLayout>
  );
};

export default OrderStatus;
