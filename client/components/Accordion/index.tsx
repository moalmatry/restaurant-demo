import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";
import { Text, View } from "react-native";
import AccordionCard from "./components/AccordionCard";
import Separator from "../Separator";
import images from "@/constants/images";
import { useTranslation } from "react-i18next";
import i18nLocale from "@/lib/locales/i18n";
import { setDir } from "@/util";

// interface AccordionProps {
//   title: string;
// }

const AccordionA = () => {
  const dir = i18nLocale.dir();
  const { t } = useTranslation();
  return (
    <View className="bg-white mt-5 rounded-lg shadow-lg px-4 py-3 h-auto w-[355px]">
      <Accordion
        type="multiple"
        collapsible
        defaultValue={["item-1"]}
        className="w-full max-w-sm native:max-w-md"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className={`${setDir(dir)}`}>
            <Text className="text-xl font-rubik font-semibold gap-2 ">
              {t("orderDetailsScreen.itemDetails", { number: 3 })}
            </Text>
          </AccordionTrigger>
          <AccordionContent>
            <AccordionCard
              image={images.burger}
              extras={[
                {
                  title: "Cheese",
                  price: "45",
                },
                {
                  title: "Bread",
                  price: "20",
                },
                {
                  title: "Lettuce",
                  price: "15",
                },
              ]}
              price="600"
              title={"Cheesy Buffalo Burger (2)"}
              notes="Please make sure to remove onions from one of the sandwiches"
            />
            <Separator />
            <AccordionCard
              image={images.potato}
              price="100"
              title={"Cheesy Buffalo Burger (2) "}
              notes="Please make sure to remove onions from one of the sandwiches"
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </View>
  );
};

export default AccordionA;
