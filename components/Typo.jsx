import React from "react";
import { Text, View } from "react-native";

const Typo = ({
  size,
  fontWeight = "400",
  children,
  className,
  color = "white",
}) => {
  return (
    <View>
      <Text
        className={"text-white " + className}
        style={{ fontSize: size, fontWeight: fontWeight, color: color }}
      >
        {children}
      </Text>
    </View>
  );
};

export default Typo;
