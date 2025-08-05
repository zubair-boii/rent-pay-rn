import { StatusBar } from "expo-status-bar";
import { Tabs } from "expo-router";
import { View } from "react-native";
import {
  HouseIcon,
  UserIcon,
  ClockCounterClockwiseIcon,
} from "phosphor-react-native";

import { ThemeColors } from "../../constants/Colors";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="flex items-center justify-center">
      <View className={"m-20 items-center "}>{icon}</View>
      {/*<Text*/}
      {/*  className={`text-xs ${focused ? "font-bold" : "font-normal"}`}*/}
      {/*  style={{ color }}*/}
      {/*>*/}
      {/*  {name}*/}
      {/*</Text>*/}
    </View>
  );
};

const TabLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: ThemeColors.tint,
          tabBarInactiveTintColor: ThemeColors.dimText,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#1e293b",
            height: 70,
            borderTopWidth: 0,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name="Home"
                focused={focused}
                icon={
                  <HouseIcon
                    size={25}
                    color={color}
                    weight={focused ? "fill" : "regular"}
                  />
                }
              />
            ),
          }}
        />

        <Tabs.Screen
          name="history"
          options={{
            title: "History",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name="History"
                focused={focused}
                icon={
                  <ClockCounterClockwiseIcon
                    size={25}
                    color={color}
                    weight={focused ? "fill" : "regular"}
                  />
                }
              />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name="Profile"
                focused={focused}
                icon={
                  <UserIcon
                    size={25}
                    color={color}
                    weight={focused ? "fill" : "regular"}
                  />
                }
              />
            ),
          }}
        />
      </Tabs>

      <StatusBar style="auto" />
    </>
  );
};

export default TabLayout;
