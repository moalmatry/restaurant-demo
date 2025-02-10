import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import React from "react";

export interface LinkButtonProps {
  title: string;
  isLoading?: boolean;
  onPress?: () => void;
}
const LinkButton = ({ title, isLoading, onPress }: LinkButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      {isLoading ? (
        <ActivityIndicator size="large" className="text-accent-100" />
      ) : (
        <Text className="text-center text-2xl text-primary-100 underline font-rubik-semibold">
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default LinkButton;
