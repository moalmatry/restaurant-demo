import { cn } from "@/util";
import React from "react";
import { TouchableOpacity } from "react-native";

interface CardLayoutProps {
  children: React.ReactNode;
  className?: string;
  onPress?: () => void;
}
const CardLayout = ({ children, className, onPress }: CardLayoutProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={cn(
        "w-[338px] h-[141px] bg-white mt-5 rounded-lg shadow-lg px-4 py-3 gap-2",
        className
      )}
    >
      {children}
    </TouchableOpacity>
  );
};

export default CardLayout;
