import { todos } from "@/context/GlobalProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
  }
};
export const editData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
  }
};
export const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
    const keys = await AsyncStorage.getAllKeys();
  } catch (e) {}
};
export const removeAll = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();

    const copy = keys.filter((item) => item !== "user");
    await AsyncStorage.multiRemove(copy);
  } catch (e) {}
};
export const getAllTodos = async () => {
  let keys: readonly string[] = [];
  let todos: todos[] = [];
  try {
    keys = await AsyncStorage.getAllKeys();

    let copy = keys.filter((item) => item !== "user");
    let values = await AsyncStorage.multiGet(copy);
    if (values.length > 0) {
      for (let index = 0; index < values.length; index++) {
        const element = values[index];
        if (element[1]) {
          const jsonValue = JSON.parse(element[1]);
          todos.push(jsonValue);
        }
      }
    } else {
      return undefined;
    }
    return todos;
  } catch (e) {
    // read key error
  }
};
