import React, {useState} from "react";
import {TextInput, View} from "react-native";

const InputField = ({
                        value,
                        onChangeText,
                        placeholder,
                        secureTextEntry = false,
                        Icon = null, // Prefix icon component
                        SuffixIcon = null, // Suffix icon component
                        iconProps = {},
                        suffixIconProps = {},
                        style = {},
                        inputStyle = {},
                        containerStyle = {},
                        borderRadius = 12,
                        paddingHorizontal = 16,
                        paddingVertical = 8,
                        onSuffixIconPress = null, // Optional tap handler for suffix icon
                    }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#1E293B", // slate-800
                borderRadius: borderRadius,
                borderWidth: 1,
                borderColor: isFocused ? "#3fbdf1" : "#334155", // focus/blur
                paddingHorizontal: paddingHorizontal,
                paddingVertical: paddingVertical,
                ...containerStyle,
                ...style,
            }}
        >
            {/* Prefix Icon */}
            {Icon && (
                <Icon
                    size={20}
                    color="#3fbdf1"
                    weight="bold"
                    style={{marginRight: 10}}
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
                    fontSize: 14,

                    ...inputStyle,
                }}
            />

            {/* Suffix Icon */}
            {SuffixIcon && (
                <View style={{marginLeft: 10}}>
                    <SuffixIcon
                        size={25}
                        color="#94a3b8"
                        weight="regular"
                        onPress={onSuffixIconPress}
                        {...suffixIconProps}
                    />
                </View>
            )}
        </View>
    );
};

export default InputField;
