import CustomBottomSheetModal from "@/components/CustomBottomSheetModal";
import Input from "@/components/Input";
import LogoPart from "@/components/LoginScreen/LogoPart";
import PrimaryButton from "@/components/PrimaryButton";
import i18nLocale from "@/lib/locales/i18n";
import { addPhone } from "@/store/features/auth/auth-slice";
import { useAppDispatch } from "@/store/store";
import { setDir } from "@/util";
import { LoginInput, loginSchema } from "@/validators/loginSchema";
import Feather from "@expo/vector-icons/Feather";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import React, { useEffect, useMemo, useRef } from "react";
import { useForm } from "react-hook-form";

import { useTranslation } from "react-i18next";
import { SafeAreaView, Text, View } from "react-native";

const LoginScreen = () => {
  const dir = i18nLocale.dir();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const snapPoint = useMemo(() => ["55%"], []);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: LoginInput) => {
    const { phone } = values;
    // const user = await onLogin(email, password, setAuthState);
    // if (user.status === "success") router.push("/(root)/(tabs)");
    console.log(phone);
    dispatch(addPhone(phone));

    router.replace("/confirmation-code");
    bottomSheetRef?.current?.close();
  };

  useEffect(() => {
    if (
      bottomSheetRef &&
      typeof bottomSheetRef === "object" &&
      bottomSheetRef.current
    ) {
      bottomSheetRef.current.present();
    }
  }, [bottomSheetRef]);
  return (
    <SafeAreaView className="flex-1">
      <LogoPart />

      <CustomBottomSheetModal
        snapPoints={snapPoint}
        index={1}
        ref={bottomSheetRef}
      >
        <View className="flex-1 justify-between">
          <View>
            <View className={`items-center gap-2 ${setDir(dir)}`}>
              <Feather name="phone" size={16} color="black" />
              <Text className="text-[16px] font-rubik">
                {t("loginScreen.phoneNumber")}
              </Text>
            </View>
            <View>
              <Input
                name="phone"
                control={control}
                placeholder={t("loginScreen.placeHolder")}
                error={errors.phone?.message}
                className={`${dir === "rtl" ? "text-right" : "text-left"}`}
              />
            </View>
          </View>
          <PrimaryButton
            onPress={handleSubmit(onSubmit)}
            title={t("loginScreen.login")}
          />
        </View>
      </CustomBottomSheetModal>
    </SafeAreaView>
  );
};

export default LoginScreen;
