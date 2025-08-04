import React from "react";
import { Text, View, StyleSheet } from "react-native";

const Typo = ({
  size,
  fontWeight = "400",
  children,
  className, // optional, if you're using Tailwind or similar
  color = "white",
  style,
  ...props
}) => {
  return (
    <View>
      <Text
        className={"text-white " + (className || "")}
        style={[
          {
            fontSize: size,
            fontWeight: fontWeight,
            color: color,
          },
          style, // parent-provided style goes last to allow overriding
        ]}
        {...props} // pass other valid props like onPress, numberOfLines, etc.
      >
        {children}
      </Text>
    </View>
  );
};

export default Typo;
