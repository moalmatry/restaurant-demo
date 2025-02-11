import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
} from "@react-navigation/material-top-tabs";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { withLayoutContext } from "expo-router";

const { Navigator } = createMaterialTopTabNavigator();

/**
 * @description Expo router does't support material top tabs by default so we configure it here to make it supports expo router
 * @link https://github.com/EvanBacon/expo-router-layouts-example/blob/main/layouts/material-bottom-tabs.tsx
 */
export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);
