import React, { useEffect, useState } from "react";
import { Platform, Text, TextInput, View } from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

const CELL_COUNT = 4;

interface ConfirmationCodeInputProps {
  onSubmit: () => void;
  onOutsideClick?: (code: string) => void;
  onChange?: (code: string) => void;
}

const ConfirmationCodeInput = ({
  onSubmit,
  onOutsideClick,
  onChange,
}: ConfirmationCodeInputProps) => {
  const [value, setValue] = useState("");

  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const handleSubmit = () => {
    onSubmit();
  };

  useEffect(() => {
    if (onChange) onChange(value);
    if (value.length === CELL_COUNT) {
      // handleSubmit();
      if (onOutsideClick) onOutsideClick(value);
    }
  }, [value]);
  return (
    <View>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoComplete={
          Platform.select({
            android: "sms-otp",
            default: "one-time-code",
          }) as "sms-otp" | "one-time-code"
        }
        testID="my-code-input"
        InputComponent={TextInput}
        renderCell={({ index, symbol, isFocused }) => (
          <View
            key={index}
            className={`w-[70px] h-[70px] rounded-lg justify-center items-center  pt-3 ${
              symbol
                ? "bg-primary-200 border-primary-100 border-2"
                : "bg-gray-50"
            }`}
            onLayout={getCellOnLayoutHandler(index)}
          >
            <Text className={"text-6xl font-rubik-semibold text-gray-800"}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default ConfirmationCodeInput;
