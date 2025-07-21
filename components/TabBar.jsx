// components/TabBar.tsx

import { ClockCounterClockwise, House, User } from "phosphor-react-native";
import React from "react";
import { StyleSheet, View } from "react-native";
import TabBarButton from "./TabBarButton";

const ICONS = {
  home: House,
  history: ClockCounterClockwise,
  profile: User,
};

const TabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.title ?? route.name;

        const isFocused = state.index === index;
        const color = isFocused ? "#3fbdf1" : "#ccc";

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const Icon = ICONS[route.name];

        return (
          <TabBarButton
            key={route.key}
            isFocused={isFocused}
            label={label}
            color={color}
            onPress={onPress}
            icon={Icon}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    height: 70,
    backgroundColor: "#1d293d", // matches your app's background
    borderTopWidth: 2,
    borderTopColor: "#263347", // subtle lighter line to separate
    elevation: 8, // shadow for Android
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
  },
});

export default TabBar;
