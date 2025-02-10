import ConfirmationCodeInput from "@/components/ConfirmationCodeScreen/ConfirmationCodeInput";
import CountdownTimer from "@/components/ConfirmationCodeScreen/CountdownTimer";
import Header from "@/components/Header";
import LinkButton from "@/components/LinkButton";
import PrimaryButton from "@/components/PrimaryButton";
import React from "react";
import { SafeAreaView, Text, View } from "react-native";

const ConfirmationCodeScreen = () => {
  return (
    <SafeAreaView className="pb-9 px-6 gap-8 bg-white flex-1">
      <Header href={"/"} title="" />
      <View>
        <Text className="font-rubik-light">
          We have sent a 4 digit code to your phone number
          <Text className="font-rubik-semibold">+966 655 366 112</Text>
          ,please add it blow to continue
        </Text>
      </View>
      <View className="mt-10 gap-20">
        <ConfirmationCodeInput
          onSubmit={() => {
            console.log("Hello World");
          }}
        />
        <View className="gap-4">
          <CountdownTimer initialTime={300} />
          <View>
            <Text className="text-center text-2xl">Didn’t receive code?</Text>
            <LinkButton title="Resend" />
          </View>
        </View>
      </View>
      <View className="flex-1" />
      <PrimaryButton title="Confirm OTP" />
    </SafeAreaView>
  );
};

export default ConfirmationCodeScreen;
