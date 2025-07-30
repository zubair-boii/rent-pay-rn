import React from "react";
import { View } from "react-native";

const LineSeparator = ({
  color = "#e5e7eb",
  thickness = 1,
  marginVertical = 12,
}) => {
  return (
    <View
      style={{
        height: thickness,
        backgroundColor: color,
        marginVertical: marginVertical,
        width: "100%",
      }}
    />
  );
};

export default LineSeparator;
