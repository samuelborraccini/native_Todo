import { getAllTodos } from "@/lib/asyncStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";
export type todos = {
  id: string;
  title: string;
  completed: boolean;
};
type initialState = {
  user: string | undefined;
  todos: todos[];
  setUser: (user: string | undefined) => void;
  setTodos: React.Dispatch<React.SetStateAction<todos[]>>;
};
const initialContext: initialState = {
  user: undefined,
  todos: [],
  setTodos: () => {},
  setUser: () => {},
};
const GlobalContext = createContext(initialContext);

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<string>();
  const [todos, setTodos] = useState<todos[]>([]);
  useEffect(() => {
    const getUser = async () => {
      const data = await AsyncStorage.getItem("user");
      if (data) {
        setUser(data);
      }
      const todos = await getAllTodos();
      if (todos) setTodos([...todos]);
    };
    getUser();
  }, []);

  return (
    <GlobalContext.Provider value={{ user, todos, setTodos, setUser }}>
      {children}
    </GlobalContext.Provider>
  );
};
