import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

interface TimeProps {
  orderStatus: "Pickup" | "Delivery" | "Table";
  time: string;
}

const Time = ({ orderStatus, time }: TimeProps) => {
  const Icon =
    orderStatus === "Pickup" ? (
      <Ionicons
        name="checkbox-outline"
        className="text-black-300"
        size={15}
        color="black"
      />
    ) : orderStatus === "Delivery" ? (
      <MaterialCommunityIcons
        name="truck-delivery-outline"
        className="text-black-300"
        size={15}
        color="black"
      />
    ) : (
      <MaterialIcons
        name="table-bar"
        className="text-black-300"
        size={15}
        color="black"
      />
    );
  return (
    <View className="flex-row justify-between items-center">
      <View className="flex-row items-center gap-2 ">
        <AntDesign
          name="clockcircleo"
          className="text-black-300"
          size={15}
          color="black"
        />
        <Text className="text-black-300 text-xl">{time}</Text>
      </View>
      <View className="flex-row items-center gap-2 ">
        {Icon}
        <Text className="text-black-300 text-xl">Pickup</Text>
      </View>
    </View>
  );
};

export default Time;
