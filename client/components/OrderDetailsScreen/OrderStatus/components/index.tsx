import i18nLocale from "@/lib/locales/i18n";
import { setDir } from "@/util";
import React from "react";
import { Text, View } from "react-native";

interface StatusProps {
  firstTitle: string;
  secondTitle: string | "Pickup" | "Delivery" | "Table";
  icon: React.ReactNode;
}

const Status = ({ icon, firstTitle, secondTitle }: StatusProps) => {
  const dir = i18nLocale.dir();
  return (
    <View className={`justify-between ${setDir(dir)}`}>
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
