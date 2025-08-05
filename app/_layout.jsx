import { Stack } from "expo-router";
import React from "react";
import { StatusBar } from "react-native";
import { AuthProvider } from "../context/authContext";

import "../global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";

const RootLayout = () => {
  return (
    <>
      <StatusBar translucent={true} animated={true} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(modals)/profileModal" />
      </Stack>
    </>
  );
};

export default function Wrapper() {
  return (
    <AuthProvider>
      <RootLayout />
    </AuthProvider>
  );
}
