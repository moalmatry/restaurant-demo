import { black } from "@/constants";
import { cn } from "@/util";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import React from "react";
import { Control, Controller } from "react-hook-form";
import { KeyboardTypeOptions, Text, TextInput, View } from "react-native";

export interface InputProps {
  /**
   * @description controller name
   */
  name: string;
  control: Control<any>;
  secureTextEntry?: boolean;
  placeholder?: string;
  iconName?: string;
  iconSize?: number;
  keyboardType?: KeyboardTypeOptions;
  error?: string;
  className?: string;
  errorViewClassName?: string;
}

const Input = ({
  placeholder,
  secureTextEntry,
  iconName,
  iconSize,
  name,
  control,
  error,
  keyboardType,
  className,
  errorViewClassName,
}: InputProps) => {
  return (
    <View>
      <View
        className={`flex-row justify-center items-center h-16 rounded-xl px-3 bg-gray-100 ${
          error ? "border-red-500 border" : ""
        }`}
      >
        {iconName && iconSize && (
          <FontAwesome6 name={iconName} size={iconSize} color={black[200]} />
        )}

        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              keyboardType={keyboardType}
              onChangeText={onChange}
              value={value}
              placeholder={placeholder}
              secureTextEntry={secureTextEntry}
              className={cn("w-[90%] pl-3 font-rubik", className)}
              onBlur={onBlur}
            />
          )}
        />
      </View>
      {error && (
        <Text
          className={cn(
            "mx-2 mt-1 font-rubik text-red-600",
            errorViewClassName
          )}
        >
          {error}
        </Text>
      )}
    </View>
  );
};

export default Input;
