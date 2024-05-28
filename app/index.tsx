import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import React, { useContext, useState } from "react";
import { storeData } from "@/lib/asyncStorage";
import { useGlobalContext } from "@/context/GlobalProvider";
import { Redirect } from "expo-router";

const index = () => {
  const [input, setInput] = useState("");
  const context = useGlobalContext();
  if (context.user) return <Redirect href="/home" />;

  const handleSubmit = () => {
    const handleStorage = async () => {
      await storeData("user", input);
    };
    handleStorage();
  };
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter name"
        value={input}
        onChangeText={setInput}
        style={styles.input}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    borderRadius: 20,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
