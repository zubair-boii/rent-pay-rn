import { Stack } from "expo-router";
import React from "react";
import { StatusBar } from "react-native";
import { AuthProvider } from "../context/authContext";

import "../global.css";

const RootLayout = () => {
  return (
    <>
      <StatusBar barStyle={"default"}></StatusBar>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
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
