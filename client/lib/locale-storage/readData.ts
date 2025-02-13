import AsyncStorage from "@react-native-async-storage/async-storage";

export const readData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (!value) return;
    return value;
  } catch (e: any) {
    // error reading value
    console.log(e);
  }
};
