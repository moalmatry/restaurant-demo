import { View, Text } from "react-native";
import React from "react";
import { useTranslation } from "react-i18next";

interface WaiterNameProps {
  name: string;
}

const WaiterName = ({ name }: WaiterNameProps) => {
  const { t } = useTranslation();

  return (
    <View className="flex-row justify-between items-center">
      <Text className="text-2xl font-rubik text-black-300">
        {t("homeScreen.waiterName")}
      </Text>
      <Text className="text-2xl font-rubik font-bold text-black-300">
        {name}
      </Text>
    </View>
  );
};

export default WaiterName;
