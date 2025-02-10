import React from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

export interface PrimaryButtonProps {
  title: string;
  isLoading?: boolean;
  onPress?: () => void;
}

const PrimaryButton = ({ onPress, title, isLoading }: PrimaryButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="h-14 bg-primary-100 justify-center flex rounded-full items-center"
    >
      {isLoading ? (
        <ActivityIndicator size="large" className="text-accent-100" />
      ) : (
        <Text className="text-center text-2xl text-accent-100 font-rubik">
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default PrimaryButton;
