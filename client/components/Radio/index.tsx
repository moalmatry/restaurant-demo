import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from "react-native";
import React from "react";
import { cn, setDir } from "@/util";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants";
import { SupportedLocales } from "@/store/features/locale/locale-slice";
import i18nLocale from "@/lib/locales/i18n";
interface RadioProps {
  options: {
    id: string;
    label: string;
    value: string;
    icon?: ImageSourcePropType;
  }[];
  onChange: React.Dispatch<React.SetStateAction<SupportedLocales>>;
  checkedValue: string;
}

const Radio = ({ options, onChange, checkedValue }: RadioProps) => {
  const dir = i18nLocale.dir();
  return (
    <View className="w-full gap-4">
      {options.map((option) => {
        const active = checkedValue === option.value;
        return (
          <TouchableOpacity
            className={cn(`${setDir(dir)} w-full justify-between`)}
            key={option.id}
            onPress={() => {
              onChange(option.value as SupportedLocales);
            }}
          >
            <View className={`${setDir(dir)} gap-2 items-center`}>
              {option.icon && (
                <Image
                  width={27}
                  height={27}
                  resizeMode="contain"
                  source={option.icon}
                />
              )}
              <Text className={cn("font-rubik-light text-lg")}>
                {option.label}
              </Text>
            </View>
            <View>
              <MaterialIcons
                name={
                  active ? "radio-button-checked" : "radio-button-unchecked"
                }
                size={25}
                color={Colors.secondary}
                style={{ marginBottom: 1 }}
              />
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Radio;
