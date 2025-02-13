import React from "react";
import { Image, ImageSourcePropType, Text, View } from "react-native";
interface AccordionCardProps {
  title: string;
  price: string;
  extras?: { title: string; price: string }[];
  notes?: string;
  image: ImageSourcePropType;
}
const AccordionCard = ({
  title,
  price,
  extras,
  notes,
  image,
}: AccordionCardProps) => {
  return (
    <View className="flex-row">
      <Image width={46} height={46} source={image} />
      <View className="h-auto w-[77%]">
        <View>
          <View className="flex-row justify-between">
            <View>
              <Text className={`text-[14px] font-rubik-semibold`}>{title}</Text>
            </View>
            <View className="flex-row">
              <Text className="text-[14px] font-rubik-semibold">{price}</Text>
              <Text className="text-[14px] font-rubik-light">EGP</Text>
            </View>
          </View>
          <Text className="font-rubik-light text-black-200">
            {extras ? "Extras:" : "No Extras"}
          </Text>
          {extras && (
            <View className="gap-2">
              {extras?.map((extra, index) => (
                <View key={index} className="flex-row justify-between">
                  <View>
                    <Text className={`text-sm font-rubik`}>
                      Extra {extra.title}
                    </Text>
                  </View>
                  <View className="flex-row gap-0.5">
                    <Text className="text-sm font-rubik">{extra.price}</Text>
                    <Text className="text-sm font-rubik-light">EGP</Text>
                  </View>
                </View>
              ))}
            </View>
          )}
          {notes && (
            <Text className="font-rubik-light text-black-200 text-xs mt-2">
              {notes}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default AccordionCard;
