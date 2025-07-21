import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

const CustomButton = ({
  children,
  loading = false,
  onPress,
  backgroundColor = "#3fbdf1",
  textColor = "#FFFFFF",
  fontSize = 16,
  fontWeight = "600",
  fontFamily,
  paddingVertical = 10,
  paddingHorizontal = 28,
  borderRadius = 20,
  buttonStyle,
  textStyle,
  indicatorColor = textColor, // color of the spinner
  ...props
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      disabled={loading}
      style={[
        {
          backgroundColor,
          paddingVertical,
          paddingHorizontal,
          borderRadius,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
        },
        styles.shadow,
        buttonStyle,
      ]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={indicatorColor} size={fontSize} />
      ) : (
        <Text
          style={[
            {
              color: textColor,
              fontSize,
              fontWeight,
              fontFamily,
              textAlign: "center",
            },
            textStyle,
          ]}
        >
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
});

export default CustomButton;
