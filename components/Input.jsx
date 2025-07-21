import React, { useState } from "react";
import { TextInput, View } from "react-native";

const InputField = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  Icon = null, // <-- Accept icon component directly
  iconProps = {}, // <-- Optional icon props
  style = {},
  inputStyle = {},
  containerStyle = {},
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#1E293B", // slate-800
        borderRadius: 12,
        borderWidth: 1,
        borderColor: isFocused ? "#3fbdf1" : "#334155", // violet/slate
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginVertical: 8,
        ...containerStyle,
        ...style,
      }}
    >
      {Icon && (
        <Icon
          size={20}
          color="#3fbdf1"
          weight="bold"
          style={{ marginRight: 10 }}
          {...iconProps}
        />
      )}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#94a3b8"
        secureTextEntry={secureTextEntry}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{
          flex: 1,
          color: "white",
          fontSize: 16,
          ...inputStyle,
        }}
      />
    </View>
  );
};

export default InputField;
