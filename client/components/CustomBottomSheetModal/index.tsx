import { cn } from "@/util";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import React, { forwardRef, useCallback, useMemo } from "react";

interface Props {
  children: React.ReactNode;
  index: number;
  renderBackdrop?: (prop: BottomSheetDefaultBackdropProps) => React.JSX.Element;
  enablePanDownToClose?: boolean;
  snapPoints?: string[];
  className?: string;
}
type Ref = BottomSheetModal;

const CustomBottomSheetModal = forwardRef<Ref, Props>(
  (
    {
      children,
      index,
      renderBackdrop,
      snapPoints,
      enablePanDownToClose = false,
      className,
    },
    ref
  ) => {
    const localSnapPoint = snapPoints
      ? snapPoints
      : useMemo(
          () => [
            "10%",
            "15%",
            "20%",
            "25%",
            "30%",
            "35%",
            "40%",
            "45%",
            "50%",
            "55%",
            "60%",
            "65%",
            "70%",
            "75%",
            "80%",
            "85%",
            "90%",
          ],
          []
        );
    const handleSheetChanges = useCallback(() => {
      // console.log("handleSheetChanges");
    }, []);

    // const renderBackdrop = useCallback(
    //   (prop: BottomSheetDefaultBackdropProps) => (
    //     <BottomSheetBackdrop
    //       appearsOnIndex={0}
    //       disappearsOnIndex={-1}
    //       {...prop}
    //     />
    //   ),
    //   []
    // );
    return (
      <BottomSheetModal
        index={index}
        snapPoints={localSnapPoint}
        ref={ref}
        onChange={handleSheetChanges}
        enablePanDownToClose={enablePanDownToClose}
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={{ backgroundColor: "#fff" }}
      >
        <BottomSheetView className={cn("flex-1 p-3", className)}>
          {children}
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

CustomBottomSheetModal.displayName = "CustomBottomSheetModal";

export default CustomBottomSheetModal;
