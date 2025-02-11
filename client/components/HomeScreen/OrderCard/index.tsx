import Separator from "@/components/Separator";
import { black, Colors } from "@/constants";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import OrderCardButton from "../../SecondaryButton";
import Time from "./components/Time";
import WaiterName from "./components/WaiterName";

interface SecondaryButtonProps {
  waiterName: string;
  orderTime: string;
  orderStatus: "Pickup" | "Delivery" | "Table";
  smsButtonStatus: "active" | "disabled";
  pickupButtonStatus: "active" | "disabled";
  smsButtonHandler: () => void;
  pickupButtonHandler: () => void;
}

const SecondaryButton = ({
  orderStatus,
  orderTime,
  pickupButtonHandler,
  pickupButtonStatus,
  smsButtonHandler,
  smsButtonStatus,
  waiterName,
}: SecondaryButtonProps) => {
  return (
    <TouchableOpacity className="w-[338px] h-[141px] bg-white mt-5 rounded-lg shadow-lg px-4 py-3 gap-2">
      <WaiterName name={waiterName} />
      <Time time={orderTime} orderStatus={orderStatus} />
      <Separator />
      <View className="flex-row justify-between items-center">
        <OrderCardButton
          status={smsButtonStatus}
          title="Send SMS"
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
          title="PickUp"
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
    </TouchableOpacity>
  );
};

export default SecondaryButton;
