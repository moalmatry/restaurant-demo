import {
  Text,
  TouchableWithoutFeedback,
  View,
  UIManager,
  Platform,
  LayoutAnimation,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { AntDesign } from "@expo/vector-icons";
import images from "@/constants/images";
import CardLayout from "../ui/CardLayout";

export default function Accordion({
  title,
  details,
}: {
  title: string;
  details: string;
}) {
  const [opened, setOpened] = useState(false);
  const animationValue = useSharedValue(0);

  useEffect(() => {
    if (opened) {
      animationValue.value = withTiming(1, {
        duration: 300,
        easing: Easing.ease,
      });
    } else {
      animationValue.value = withTiming(0, {
        duration: 300,
        easing: Easing.ease,
      });
    }
  }, [opened]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      height: animationValue.value * 70,
      opacity: animationValue.value,
    };
  });

  if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  function toggleAccordion() {
    LayoutAnimation.configureNext({
      duration: 300,
      create: { type: "easeIn", property: "opacity" },
      update: { type: "linear", springDamping: 0.3, duration: 250 },
    });
    setOpened(!opened);
  }

  return (
    <CardLayout className="h-auto w-[355px] gap-0">
      <TouchableWithoutFeedback onPress={toggleAccordion}>
        <View className="flex-row justify-between">
          <Text className="text-xl font-rubik font-semibold gap-2">
            Item Details
          </Text>
          <View>
            <AntDesign name={opened ? "up" : "down"} size={22} />
          </View>
        </View>
      </TouchableWithoutFeedback>

      {opened && (
        <>
          <Animated.View style={[animatedStyles, { marginTop: 8 }]}>
            <View className="flex-row">
              <Image width={46} height={46} source={images.burger} />
              <View className="flex-row w-[80%] justify-between h-auto">
                <View>
                  <Text className={`text-sm font-rubik-semibold`}>{title}</Text>
                  <Text className={`text-sm font-rubik-semibold`}>{title}</Text>
                  <Text className={`text-sm font-rubik-semibold`}>{title}</Text>
                  <Text className={`text-sm font-rubik-semibold`}>{title}</Text>
                  <Text className={`text-sm font-rubik-semibold`}>{title}</Text>
                </View>
                <View className="flex-row gap-0.5">
                  <Text className="font-rubik-semibold">600</Text>
                  <Text>EGP</Text>
                </View>
              </View>
            </View>
          </Animated.View>
        </>
      )}
    </CardLayout>
  );
}
