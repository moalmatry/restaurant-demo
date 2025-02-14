import CustomBottomSheetModal from "@/components/CustomBottomSheetModal";
import Header from "@/components/Header";
import PrimaryButton from "@/components/PrimaryButton";
import ProfileImage from "@/components/ProfileScreen/ProfileImage";
import Radio from "@/components/Radio";
import SettingItem from "@/components/SettingItem";
import { LANGUAGE } from "@/constants";
import { languages } from "@/constants/data";
import icons from "@/constants/icons";
import { storeData } from "@/lib/locale-storage/storeData";
import i18nLocale, { setLocale } from "@/lib/locales/i18n";
import { SupportedLocales } from "@/store/features/locale/locale-slice";
import { setDir, setRotateDir, setTextDir } from "@/util";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import * as Updates from "expo-updates";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { SafeAreaView, ScrollView, Text, View } from "react-native";

const SettingsScreen = () => {
  const dir = i18nLocale.dir();
  const [language, selectedLanguage] = useState<SupportedLocales>(
    i18nLocale.language as SupportedLocales
  );
  const { t } = useTranslation();
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const snapPoint = useMemo(() => ["30%"], []);
  const handlePresentModal = () => bottomSheetRef.current?.present();

  const renderBackdrop = useCallback(
    (prop: BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...prop}
      />
    ),
    []
  );

  const changeLanguageHandler = async () => {
    setLocale(language);
    await storeData(LANGUAGE, language);
    await Updates.reloadAsync();
  };

  return (
    <SafeAreaView className="h-full bg-gray-100 ">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 px-7"
      >
        <Header className={`${setDir(dir)}`} />
        <ProfileImage
          name={"Restaurant Name"}
          profileImage={
            "https://ui-avatars.com/api/?name=ez&size=250&background=E31837&color=fff"
          }
        />

        <View className="flex flex-col mt-10">
          <SettingItem
            icon={icons.calendar}
            title={t("settingsScreen.myBookings")}
          />
          <SettingItem
            icon={icons.wallet}
            title={t("settingsScreen.payment")}
          />
        </View>
        {/* <View className="flex flex-col mt-5 border-t pt-5 border-primary-200">
          {settings.map((item, index) => (
            <SettingItem
              key={index}
              onPress={() => router.push(item.href)}
              {...item}
            />
          ))}
        </View> */}

        <View className="flex flex-col mt-5 border-t pt-5 border-primary-200">
          <SettingItem
            icon={icons.languages}
            title={t("settingsScreen.changeLanguage")}
            showArrow={false}
            onPress={handlePresentModal}
          />
          <SettingItem
            icon={icons.logout}
            title={t("settingsScreen.logout")}
            textStyle="text-danger"
            showArrow={false}
            classNameIcon={setRotateDir(dir)}
          />
        </View>

        <CustomBottomSheetModal
          snapPoints={snapPoint}
          index={1}
          ref={bottomSheetRef}
          renderBackdrop={renderBackdrop}
          className="p-0 pb-3 px-6"
        >
          <View className="flex-1 gap-4 ">
            <Text
              className={`text-2xl font-rubik font-bold ${setTextDir(dir)}`}
            >
              {t("settingsScreen.selectLanguage")}
            </Text>
            <Radio
              options={languages}
              checkedValue={language}
              onChange={selectedLanguage}
            />

            <View className="flex-1" />
            <PrimaryButton
              title={t("settingsScreen.saveChanges")}
              className="h-12 bg-secondary-100"
              textClassName="text-lg font-rubik-semibold"
              onPress={changeLanguageHandler}
            />
          </View>
        </CustomBottomSheetModal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;
