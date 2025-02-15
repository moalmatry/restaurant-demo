import { Extras } from "@/constants/data";
import i18nLocale from "@/lib/locales/i18n";
import { setDir, setTextDir } from "@/util";
import React from "react";
import { useTranslation } from "react-i18next";
import { Image, ImageSourcePropType, Text, View } from "react-native";
interface AccordionCardProps {
  title: string;
  price: string;
  extras?: Extras[];
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
  const { t } = useTranslation();
  const dir = i18nLocale.dir();

  return (
    <View className={`${setDir(dir)}`}>
      <Image width={46} height={46} source={image} />
      <View className="h-auto w-[77%]">
        <View>
          <View className={`${setDir(dir)} justify-between`}>
            <View>
              <Text className={`text-[14px] font-rubik-semibold`}>{title}</Text>
            </View>
            <View className={`${setDir(dir)} gap-1`}>
              <Text className="text-[14px] font-rubik-semibold">{price}</Text>
              <Text className="text-[14px] font-rubik-light">
                {t("orderDetailsScreen.egp")}
              </Text>
            </View>
          </View>
          <Text
            className={`font-rubik-light text-black-200 ${setTextDir(dir)}`}
          >
            {extras
              ? t("orderDetailsScreen.extras")
              : t("orderDetailsScreen.noExtras")}
          </Text>
          {extras && (
            <View className="gap-2">
              {extras?.map((extra, index) => (
                <View key={index} className={`${setDir(dir)} justify-between`}>
                  <View>
                    <Text className={`text-sm font-rubik`}>
                      {t("orderDetailsScreen.extras")} {extra.name}
                    </Text>
                  </View>
                  <View className={`${setDir(dir)} gap-0.5`}>
                    <Text className="text-sm font-rubik">{extra.price}</Text>
                    <Text className="text-sm font-rubik-light">
                      {" "}
                      {t("orderDetailsScreen.egp")}
                    </Text>
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
