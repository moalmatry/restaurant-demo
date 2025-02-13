import images from "@/constants/images";
import React from "react";
import { useTranslation } from "react-i18next";
import { Image, ImageBackground, Text, View } from "react-native";

const LogoPart = () => {
  const { t } = useTranslation();
  return (
    <>
      <ImageBackground
        source={images.linearBackground}
        className="flex-1 absolute w-full h-3/5"
        resizeMode="stretch"
      />
      <View className="justify-between items-center px-6 pt-16 h-2/5">
        <Image
          className="h-[114px] w-[121.77px]"
          resizeMode="contain"
          source={images.ezLogo}
        />
        <Text className="text-white font-rubik text-lg text-center">
          {t("loginScreen.title")}
        </Text>
      </View>
    </>
  );
};

export default LogoPart;
