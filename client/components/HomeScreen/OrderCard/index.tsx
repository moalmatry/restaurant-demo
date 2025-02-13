import Separator from "@/components/Separator";
import CardLayout from "@/components/ui/CardLayout";
import { black, Colors } from "@/constants";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { View } from "react-native";
import OrderCardButton from "../../SecondaryButton";
import Time from "./components/Time";
import WaiterName from "./components/WaiterName";
import { useTranslation } from "react-i18next";

interface SecondaryButtonProps {
  waiterName: string;
  orderTime: string;
  orderStatus: "Pickup" | "Delivery" | "Table";
  smsButtonStatus: "active" | "disabled";
  pickupButtonStatus: "active" | "disabled";
  smsButtonHandler: () => void;
  pickupButtonHandler: () => void;
  onPress?: () => void;
}

const SecondaryButton = ({
  orderStatus,
  orderTime,
  pickupButtonHandler,
  pickupButtonStatus,
  smsButtonHandler,
  smsButtonStatus,
  waiterName,
  onPress,
}: SecondaryButtonProps) => {
  const { t } = useTranslation();
  return (
    <CardLayout onPress={onPress}>
      <WaiterName name={waiterName} />
      <Time time={orderTime} orderStatus={orderStatus} />
      <Separator />
      <View className="flex-row justify-between items-center">
        <OrderCardButton
          status={smsButtonStatus}
          title={t("homeScreen.sendSms")}
          onPress={smsButtonHandler}
          Icon={
            <AntDesign
              name="message1"
              size={16}
              color={
                smsButtonStatus === "active"
                  ? Colors.light.background
                  : black[100]
              }
            />
          }
        />

        <OrderCardButton
          status={pickupButtonStatus}
          title={t("homeScreen.pickup")}
          onPress={pickupButtonHandler}
          Icon={
            <MaterialIcons
              name="check-circle-outline"
              size={16}
              color={
                pickupButtonStatus === "active"
                  ? Colors.light.background
                  : black[100]
              }
            />
          }
        />
      </View>
    </CardLayout>
  );
};

export default SecondaryButton;
