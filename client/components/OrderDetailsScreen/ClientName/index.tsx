import CardLayout from "@/components/ui/CardLayout";
import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { openURL } from "expo-linking";

interface ClientNameProps {
  name: string;
  phone: string;
}

const ClientName = ({ name, phone }: ClientNameProps) => {
  return (
    <CardLayout className="h-auto flex-row justify-between shadow-black shadow-2xl w-[355px]">
      <View>
        <Text className="text-xl font-rubik font-semibold">
          Client Name Order
        </Text>
        <Text className="font-rubik-light text-black-200">{name}</Text>
      </View>
      <TouchableOpacity
        onPress={() => openURL(`tel:${phone}`)}
        className="w-11 h-11 rounded-full bg-black-200 items-center justify-center"
      >
        <Feather name="phone" size={20} color="white" />
      </TouchableOpacity>
    </CardLayout>
  );
};

export default ClientName;
