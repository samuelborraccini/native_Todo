import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Animated, {
  FadeInUp,
  FadeOut,
  FadingTransition,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { todos, useGlobalContext } from "@/context/GlobalProvider";
import { editData, removeData } from "@/lib/asyncStorage";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const TodoItem = ({ todo }: { todo: todos }) => {
  const globalContext = useGlobalContext();
  const handleComplete = async () => {
    const newTodo = { ...todo, completed: !todo.completed };
    const newArray = globalContext.todos.map((item) =>
      item.id === todo.id ? newTodo : item
    );

    const item = JSON.stringify(newTodo);
    await editData(todo.id, item);
    globalContext.setTodos([...newArray]);
  };
  const removeHandler = async () => {
    const newState = globalContext.todos.filter((item) => item.id !== todo.id);

    globalContext.setTodos([...newState]);
    await removeData(todo.id);
  };
  const dragX = useSharedValue(0);
  const onAction = useSharedValue(false);
  const tapGesture = Gesture.Pan()
    .onChange((event) => {
      if (event.translationX < 0) {
        onAction.value = true;
        dragX.value = event.translationX;
      }
    })
    .onEnd(async (event) => {
      if (dragX.value <= -180) {
        dragX.value = withTiming(-10000, { duration: 600 });

        runOnJS(removeHandler)();
      } else {
        onAction.value = false;
        dragX.value = withSpring(0);
      }
    });
  const itemContainerStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: dragX.value,
      },
    ],
  }));
  const absoluteItemStyle = useAnimatedStyle(() => ({
    left: !onAction.value ? "20%" : 0,
  }));
  return (
    <Animated.View key={todo.id} entering={FadeInUp}>
      <GestureDetector gesture={tapGesture}>
        <Animated.View style={[itemContainerStyle, styles.listItem]}>
          <BouncyCheckbox
            style={styles.item}
            size={25}
            fillColor="#0061FF"
            unFillColor="#FFFFFF"
            text={todo.title}
            textStyle={{
              color: "black",
            }}
            onPress={(isChecked: boolean) => {
              handleComplete();
            }}
            isChecked={todo.completed}
          />
        </Animated.View>
      </GestureDetector>
      <Animated.View style={[styles.absoluteItem, absoluteItemStyle]}>
        <FontAwesome
          name="trash"
          size={25}
          style={{
            color: "white",
          }}
        />
      </Animated.View>
    </Animated.View>
  );
};

export default TodoItem;

const styles = StyleSheet.create({
  listItem: {
    position: "relative",
    backgroundColor: "white",
    paddingHorizontal: 12,
  },

  item: {
    marginVertical: 12,
  },
  absoluteItem: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "red",
    zIndex: -1,
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    paddingRight: 24,
  },
});
