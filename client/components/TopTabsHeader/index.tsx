import React from "react";
import { Image, View } from "react-native";
import UserInfo from "../UserInfo";
import images from "@/constants/images";
import i18nLocale from "@/lib/locales/i18n";
import { setDir } from "@/util";
import { useAppSelector } from "@/store/store";

const TobTabsHeader = () => {
  const userName = useAppSelector((state) => state.auth.name);
  const avatar = useAppSelector((state) => state.auth.profileImg);
  const dir = i18nLocale.dir();
  const flexDir = setDir(dir);

  if (!dir) return;
  return (
    <View
      className={`${flexDir} justify-between items-center bg-white px-6 pb-4`}
    >
      <UserInfo name={userName} profileImage={avatar} />
      <Image source={images.ezLogo2} />
    </View>
  );
};

export default TobTabsHeader;
