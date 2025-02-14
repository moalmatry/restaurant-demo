import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key: string, value: string) => {
  try {
    return await AsyncStorage.setItem(key, value);
  } catch (e: any) {
    // saving error
    console.log(e);
  }
};
