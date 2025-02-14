import icons from "@/constants/icons";
import i18nLocale from "@/lib/locales/i18n";
import { cn } from "@/util";
import React from "react";
import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface SettingItemProps {
  icon: ImageSourcePropType;
  title: string;
  onPress?: () => void;
  textStyle?: string;
  showArrow?: boolean;
  classNameIcon?: string;
}

const SettingItem = ({
  icon,
  title,
  onPress,
  textStyle,
  classNameIcon,
  showArrow = true,
}: SettingItemProps) => {
  const dir = i18nLocale.dir();

  if (!dir) return;
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`${
        dir === "rtl" ? "flex-row-reverse" : "flex-row"
      } items-center justify-between py-3 `}
    >
      <View className="flex flex-row items-center gap-3">
        <Image className={cn("size-6", classNameIcon)} source={icon} />
        <Text
          className={`text-lg font-rubik-medium text-black-300 ${textStyle}`}
        >
          {title}
        </Text>
      </View>
      {showArrow && (
        <Image
          source={icons.rightArrow}
          className={`size-6 ${dir === "rtl" ? "rotate-180" : ""}`}
        />
      )}
    </TouchableOpacity>
  );
};

export default SettingItem;
