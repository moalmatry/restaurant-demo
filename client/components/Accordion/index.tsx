import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Item } from "@/constants/data";
import images from "@/constants/images";
import i18nLocale from "@/lib/locales/i18n";
import { setDir } from "@/util";
import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import Separator from "../Separator";
import AccordionCard from "./components/AccordionCard";

interface AccordionProps {
  items: Item[] | undefined;
}

const OrderDetailsAccordion = ({ items }: AccordionProps) => {
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
              {t("orderDetailsScreen.itemDetails", {
                number: items?.length ?? 0,
              })}
            </Text>
          </AccordionTrigger>
          <AccordionContent>
            {items?.map((item) => (
              <Fragment key={item.id}>
                <AccordionCard
                  image={images.burger}
                  extras={item.extras}
                  price={`${item.price}`}
                  title={`${item.name} (${item.qty})`}
                  // notes="Please make sure to remove onions from one of the sandwiches"
                />
                <Separator />
              </Fragment>
            ))}
            {/* <AccordionCard
              image={images.potato}
              price="100"
              title={"Cheesy Buffalo Burger (2) "}
              notes="Please make sure to remove onions from one of the sandwiches"
            /> */}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </View>
  );
};

export default OrderDetailsAccordion;
