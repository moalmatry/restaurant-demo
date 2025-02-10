import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const BottomSheetProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>{children}</BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default BottomSheetProvider;
