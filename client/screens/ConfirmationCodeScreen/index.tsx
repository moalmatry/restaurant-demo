import ConfirmationCodeInput from "@/components/ConfirmationCodeScreen/ConfirmationCodeInput";
import CountdownTimer from "@/components/ConfirmationCodeScreen/CountdownTimer";
import Header from "@/components/Header";
import LinkButton from "@/components/LinkButton";
import PrimaryButton from "@/components/PrimaryButton";
import i18nLocale from "@/lib/locales/i18n";
import { confirmLoginCode } from "@/store/features/auth/auth-slice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setTextDir } from "@/util";
import { router } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { SafeAreaView, Text, View } from "react-native";
import Toast from "react-native-toast-message";

const ConfirmationCodeScreen = () => {
  const dir = i18nLocale.dir();
  const [code, setCode] = useState("");
  const phone = useAppSelector((state) => state.auth.phone);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const setCodeHandler = (value: string) => setCode(value);
  const submitOTPHandler = async () => {
    if (code.length !== 4) return;
    const data = await dispatch(confirmLoginCode({ code, phone }));
    const payload = data.payload as { token: string } | undefined;

    if (payload?.token) {
      router.replace("/(root)/(tabs)/(top-tabs)");
    } else {
      Toast.show({
        type: "error",
        text1: t("error.general"),
        position: "top",
      });
    }
  };
  return (
    <SafeAreaView className="pb-9 px-6 gap-8 bg-white flex-1">
      <Header href={"/"} title="" />
      <View>
        <Text className={`font-rubik-light ${setTextDir(dir)}`}>
          {t("ConfirmationCodeScreen.titleOne")}
          <Text className="font-rubik-semibold"> {phone} </Text>
          {t("ConfirmationCodeScreen.titleTwo")}
        </Text>
      </View>
      <View className="mt-10 gap-20">
        <ConfirmationCodeInput
          onChange={setCodeHandler}
          onSubmit={submitOTPHandler}
        />
        <View className="gap-4">
          <CountdownTimer initialTime={600} />
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
        onPress={submitOTPHandler}
        disabled={code.length !== 4 ? true : false}
        className={`${code.length !== 4 ? "bg-gray-300" : ""}`}
        title={t("ConfirmationCodeScreen.confirmOtp")}
      />
    </SafeAreaView>
  );
};

export default ConfirmationCodeScreen;
