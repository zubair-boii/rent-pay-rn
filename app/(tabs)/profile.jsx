import { useRouter } from "expo-router";
import {
  CaretRightIcon,
  GearIcon,
  LockIcon,
  PencilSimpleIcon,
  SignOutIcon,
} from "phosphor-react-native";
import React from "react";
import { Alert, Image, ScrollView, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import Typo from "../../components/Typo";
import { useAuth } from "../../context/authContext";

const ProfileScreen = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert("Log out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log out",
        onPress: async () => {
          await logout();
          router.replace("/welcome");
        },
      },
    ]);
  };

  const rows = [
    {
      label: "Edit Profile",
      icon: <PencilSimpleIcon size={22} color="#8b5cf6" weight="bold" />,
      onPress: () => router.push("../(modals)/profileModal"),
    },
    {
      label: "Settings",
      icon: <GearIcon size={22} color="#10b981" weight="bold" />,
      onPress: () => router.push("./settings"),
    },
    {
      label: "Privacy Policy",
      icon: <LockIcon size={22} color="#f59e0b" weight="bold" />,
      onPress: () => router.push("./privacy-policy"),
    },
    {
      label: "Logout",
      icon: <SignOutIcon size={22} color="#ef4444" weight="bold" />,
      onPress: handleLogout,
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-slate-900 px-[10%]">
      <View className="items-center mt-[5%]">
        <Typo size={20} fontWeight="500">
          Profile
        </Typo>
      </View>
      <View className="items-center mt-[10%] mb-[5%]">
        <Image
          source={{
            uri:
              user?.image ||
              `https://ui-avatars.com/api/?name=${user?.userName || ""}`,
          }}
          className="w-[40%] aspect-square rounded-full mb-4"
        />
        <Typo color="white" fontWeight="500" size={30}>
          {user?.userName || "No Name"}
        </Typo>
        <Typo color="#90a1b9" size={15}>
          {user?.email}
        </Typo>
      </View>

      <ScrollView>
        <View className="mt-[6%] gap-5 ">
          {rows.map((item, index) => (
            <Animated.View
              entering={FadeInDown.delay(index * 100)
                .springify()
                .damping(14)}
              key={index}
            >
              <TouchableOpacity
                key={index}
                onPress={item.onPress}
                className="bg-slate-800 flex-row items-center justify-between p-[6%] rounded-2xl"
              >
                <Animated.View
                  entering={FadeInDown.delay(index * 100)
                    .springify()
                    .damping(14)}
                  className="flex-row items-center gap-[10%]"
                >
                  {item.icon}
                  <Typo className="text-white text-base">{item.label}</Typo>
                </Animated.View>
                <CaretRightIcon color="#9ca3af" size={19} />
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
