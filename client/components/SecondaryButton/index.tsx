import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface OrderCardButtonProps {
  Icon: React.ReactNode;
  title: string;
  status: "active" | "disabled";
  onPress?: () => void;
}

const OrderCardButton = ({
  Icon,
  status,
  title,
  onPress,
}: OrderCardButtonProps) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (status === "disabled") return;
        if (onPress) onPress();
      }}
      className={`w-[152px] justify-center items-center h-[30px] rounded-2xl flex-row gap-2 ${
        status === "active" ? "bg-secondary-100" : "bg-gray-100"
      }`}
    >
      {Icon}
      <Text
        className={`${status === "active" ? "text-white" : "text-black-100"}`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default OrderCardButton;
