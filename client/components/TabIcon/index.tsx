import { View, Text, Image } from "react-native";
import React from "react";

const TabIcon = ({
  focused,
  icon,
  title,
}: {
  focused: boolean;
  icon: any;
  title: string;
}) => (
  <View className="flex-1 mt-3 flex flex-col items-center">
    <Image
      source={icon}
      tintColor={focused ? "#ea374a" : "#666876"}
      resizeMode="contain"
      className="size-10"
    />
    <Text
      className={`${
        focused
          ? "text-primary-100 font-rubik-medium"
          : "text-black-200 font-rubik"
      } text-xs w-full text-center`}
    >
      {title}
    </Text>
  </View>
);

export default TabIcon;
