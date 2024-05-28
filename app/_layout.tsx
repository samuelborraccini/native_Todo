import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Link, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import AntDesign from "@expo/vector-icons/AntDesign";

import { useColorScheme } from "@/components/useColorScheme";
import { GlobalProvider } from "@/context/GlobalProvider";
import { Pressable } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView>
      <GlobalProvider>
        <ThemeProvider value={DefaultTheme}>
          <Stack
            screenOptions={{
              contentStyle: {
                backgroundColor: "white",
              },
            }}
          >
            <Stack.Screen name="index" options={{ headerBackVisible: false }} />
            <Stack.Screen
              name="home"
              options={{
                headerBackVisible: false,
                headerRight: () => (
                  <Link href="/modal" asChild>
                    <Pressable>
                      {({ pressed }) => (
                        <AntDesign
                          name="plus"
                          size={24}
                          style={{ paddingHorizontal: 8 }}
                          color="#0080ff"
                        />
                      )}
                    </Pressable>
                  </Link>
                ),
              }}
            />
            <Stack.Screen
              name="modal"
              options={{ title: "Add new ToDo", presentation: "modal" }}
            />
          </Stack>
        </ThemeProvider>
        <Toast />
      </GlobalProvider>
    </GestureHandlerRootView>
  );
}
