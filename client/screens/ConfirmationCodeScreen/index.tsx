import ConfirmationCodeInput from "@/components/ConfirmationCodeScreen/ConfirmationCodeInput";
import CountdownTimer from "@/components/ConfirmationCodeScreen/CountdownTimer";
import Header from "@/components/Header";
import LinkButton from "@/components/LinkButton";
import PrimaryButton from "@/components/PrimaryButton";
import { router } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { SafeAreaView, Text, View } from "react-native";

const ConfirmationCodeScreen = () => {
  const { t } = useTranslation();
  return (
    <SafeAreaView className="pb-9 px-6 gap-8 bg-white flex-1">
      <Header href={"/"} title="" />
      <View>
        <Text className="font-rubik-light">
          {t("ConfirmationCodeScreen.titleOne")}
          <Text className="font-rubik-semibold">+966 655 366 112</Text>
          {t("ConfirmationCodeScreen.titleTwo")}
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
            <Text className="text-center text-2xl">
              {t("ConfirmationCodeScreen.didNotReceive")}
            </Text>
            <LinkButton title={t("ConfirmationCodeScreen.resend")} />
          </View>
        </View>
      </View>
      <View className="flex-1" />
      <PrimaryButton
        onPress={() => router.push("/(root)/(tabs)/(top-tabs)")}
        title={t("ConfirmationCodeScreen.confirmOtp")}
      />
    </SafeAreaView>
  );
};

export default ConfirmationCodeScreen;
