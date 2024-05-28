import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { todos, useGlobalContext } from "@/context/GlobalProvider";
import { useNavigation } from "expo-router";

import Animated, {
  LinearTransition,
  SequencedTransition,
} from "react-native-reanimated";
import TodoItem from "@/components/todoItem";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { removeAll } from "@/lib/asyncStorage";
const home = () => {
  const user = useGlobalContext();
  const navigation = useNavigation();
  const clearAll = async () => {
    user.setTodos([]);
    await removeAll();
  };
  useEffect(() => {
    navigation.setOptions({
      title: `${user.user} ToDo's`,
      headerLeft: () => (
        <Pressable onPress={clearAll}>
          {({ pressed }) => (
            <Text
              style={{
                marginRight: 15,
                opacity: pressed ? 0.5 : 1,
                color: "#0080ff",
                fontSize: 15,
              }}
            >
              Clear All
            </Text>
          )}
        </Pressable>
      ),
    });
  }, []);

  if (user.todos.length === 0)
    return (
      <View style={{ marginTop: "70%" }}>
        <Text style={styles.emptyList}>No todos added yet...</Text>
      </View>
    );
  return (
    <View style={styles.outterContainer}>
      <Animated.FlatList
        itemLayoutAnimation={LinearTransition.duration(200)}
        data={user.todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TodoItem todo={item} />}
      />
    </View>
  );
};

export default home;

const styles = StyleSheet.create({
  outterContainer: {
    marginVertical: 24,
  },

  item: {
    marginVertical: 12,
  },
  emptyList: {
    color: "#999999",
    fontSize: 24,
    fontWeight: "bold",
    marginHorizontal: "auto",
  },
});
