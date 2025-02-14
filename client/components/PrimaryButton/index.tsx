import { capitalizeFirstLetter, cn } from "@/util";
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

export interface PrimaryButtonProps {
  title: string;
  isLoading?: boolean;
  onPress?: () => void;
  className?: string;
  textClassName?: string;
  disabled?: boolean;
}

const PrimaryButton = ({
  onPress,
  title,
  isLoading,
  className,
  textClassName,
  disabled,
}: PrimaryButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={cn(
        "h-14 bg-primary-100 justify-center flex rounded-full items-center",
        className
      )}
    >
      {isLoading ? (
        <ActivityIndicator size="large" className="text-accent-100" />
      ) : (
        <Text
          className={cn(
            "text-center text-2xl text-accent-100 font-rubik",
            textClassName
          )}
        >
          {capitalizeFirstLetter(title)}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default PrimaryButton;
