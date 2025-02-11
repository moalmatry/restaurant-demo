import { View, Text } from "react-native";
import React from "react";

interface WaiterNameProps {
  name: string;
}

const WaiterName = ({ name }: WaiterNameProps) => {
  return (
    <View className="flex-row justify-between items-center">
      <Text className="text-2xl font-rubik text-black-300">Waiter Name</Text>
      <Text className="text-2xl font-rubik font-bold text-black-300">
        {name}
      </Text>
    </View>
  );
};

export default WaiterName;
