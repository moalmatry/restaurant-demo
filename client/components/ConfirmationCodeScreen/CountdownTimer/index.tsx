import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

interface CountdownTimerProps {
  initialTime: number;
  onTimeChange?: (time: number) => void;
}

const CountdownTimer = ({ initialTime }: CountdownTimerProps) => {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    if (time > 0) {
      const timerId = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [time]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <View className="justify-center items-center">
      <Text className="text-6xl font-bold font-rubik-light text-gray-800">
        {formatTime(time)}
      </Text>
    </View>
  );
};

export default CountdownTimer;
