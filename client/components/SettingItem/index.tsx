import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from "react-native";
import React from "react";
import icons from "@/constants/icons";
import i18nLocale from "@/lib/locales/i18n";
import { cn, setDir, setRotateDir } from "@/util";

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

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex flex-row items-center justify-between py-3 ${setDir(
        dir
      )}`}
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
          className={`size-5 ${setRotateDir(dir)}`}
        />
      )}
    </TouchableOpacity>
  );
};

export default SettingItem;
