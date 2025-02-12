import React from "react";
import { Text, View } from "react-native";

interface StatusProps {
  firstTitle: string;
  secondTitle: string | "Pickup" | "Delivery" | "Table";
  icon: React.ReactNode;
}

const Status = ({ icon, firstTitle, secondTitle }: StatusProps) => {
  return (
    <View className="flex-row justify-between">
      <View className="flex-row justify-center items-center gap-2">
        {icon}
        <Text className="text-black-200 text-lg font-rubik">{firstTitle}</Text>
      </View>
      <View>
        <Text className="text-xl font-rubik">{secondTitle}</Text>
      </View>
    </View>
  );
};

export default Status;
