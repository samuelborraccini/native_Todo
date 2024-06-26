import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import React, { useContext, useState } from "react";
import { storeData } from "@/lib/asyncStorage";
import { todos, useGlobalContext } from "@/context/GlobalProvider";
import { Redirect } from "expo-router";
import { generateRandomId, generateRandomKey } from "@/helpers/createId";
import Toast from "react-native-toast-message";

const modal = () => {
  const [input, setInput] = useState("");
  const context = useGlobalContext();

  const handleSubmit = () => {
    const handleStorage = async () => {
      const randomKey = generateRandomKey();

      const newTask: todos = {
        id: randomKey,
        title: input,
        completed: false,
      };
      const currentTasks = context.todos;
      context.setTodos([...currentTasks, newTask]);
      const item = JSON.stringify(newTask);
      await storeData(randomKey, item);
      setInput("");
    };
    handleStorage();
    Toast.show({
      type: "success",
      text1: "Task added successfully!",
    });
  };
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter text"
        value={input}
        onChangeText={setInput}
        style={styles.input}
      />
      <Button title="Submit" onPress={handleSubmit} />
      <Toast />
    </View>
  );
};

export default modal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
});
