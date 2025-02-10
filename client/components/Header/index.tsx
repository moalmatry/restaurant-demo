import AntDesign from "@expo/vector-icons/AntDesign";
import { Href, router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface HeaderProps {
  title: string;
  href?: Href;
}

const Header = ({ title, href }: HeaderProps) => {
  return (
    <View className="flex flex-row items-center justify-between mt-5">
      <TouchableOpacity
        className="flex flex-row items-center justify-center"
        onPress={() => (href ? router.push(href) : router.back())}
      >
        <AntDesign name="left" size={20} color="black" />
      </TouchableOpacity>

      <Text className="text-base mr-2 text-center font-rubik-medium text-black-300">
        {title}
      </Text>
      {/* <Image source={icons.bell} className="w-6 h-6" /> */}
      <View className="w-4 h-4"></View>
    </View>
  );
};

export default Header;
