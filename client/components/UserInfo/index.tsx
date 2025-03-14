import i18nLocale from "@/lib/locales/i18n";
import { setDir } from "@/util";
import { capitalizeWords } from "@/util/string";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
interface ProfileProps {
  name: string;
  profileImage: string;
}
const UserInfo = ({ name, profileImage }: ProfileProps) => {
  const dir = i18nLocale.dir();
  return (
    <View className={`items-center justify-between mt-5`}>
      <TouchableOpacity
        // onPress={() => router.push("/")}
        className={`${setDir(dir)} items-center`}
      >
        <Image
          source={{ uri: profileImage }}
          className="size-12 rounded-full"
        />
        <View className="flex flex-col items-start ml-2 justify-center">
          <Text className="text-lg font-rubik-medium text-black-300">
            {capitalizeWords(name)}
            {/* محمد المطري */}
          </Text>
          <Text className="font-rubik-light text-black-300 text-lg">
            8:00 - 16:00
          </Text>
        </View>
      </TouchableOpacity>

      {/* TODO: Coming Soon */}
      {/* <Image source={icons.bell} className="size-6" /> */}
    </View>
  );
};

export default UserInfo;
