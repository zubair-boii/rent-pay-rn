import { Stack } from "expo-router";
import React from "react";

const ProfileSettingsLayout = () => {
  return (
    <Stack options={{ headerShown: false }}>
      <Stack.Screen
        name="privacy-policy"
        options={{ headerShown: false, presentation: "modal" }}
      />
      <Stack.Screen name="settings" options={{ headerShown: false }} />
      <Stack.Screen name="create" options={{ headerShown: false }} />
    </Stack>
  );
};

export default ProfileSettingsLayout;
