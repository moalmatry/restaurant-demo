import React from "react";
import { Image, View } from "react-native";
import UserInfo from "../UserInfo";
import images from "@/constants/images";

const TobTabsHeader = () => {
  return (
    <View className="flex-row justify-between items-center bg-white px-6 pb-4">
      <UserInfo
        name="Restaurant Name"
        profileImage="https://ui-avatars.com/api/?name=ez&size=250&background=E31837&color=fff"
      />
      <Image source={images.ezLogo2} />
    </View>
  );
};

export default TobTabsHeader;
