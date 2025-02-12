import { cn } from "@/util";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Href, router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface HeaderProps {
  title?: string;
  href?: Href;
  left?: React.ReactNode;
  rightTitle?: string;
  className?: string;
}

const Header = ({ title, href, left, rightTitle, className }: HeaderProps) => {
  return (
    <View
      className={cn(
        "flex flex-row items-center justify-between mt-5",
        className
      )}
    >
      <TouchableOpacity
        className="flex flex-row items-center justify-center gap-2"
        onPress={() => (href ? router.push(href) : router.back())}
      >
        <AntDesign name="left" size={20} color="black" />
        <Text className="text-xl font-rubik mt-1">{rightTitle}</Text>
      </TouchableOpacity>

      <Text className="text-base mr-2 text-center font-rubik-medium text-black-300">
        {title}
      </Text>
      {/* <Image source={icons.bell} className="w-6 h-6" /> */}
      <View className="">{left}</View>
    </View>
  );
};

export default Header;
