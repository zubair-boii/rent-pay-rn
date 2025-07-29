import React, { useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { ArrowUpIcon, ArrowDownIcon } from "phosphor-react-native";
import Typo from "./Typo";

const NumberInput = ({ value, onChange, step = 1, min = 0, max = 999 }) => {
  const [internalValue, setInternalValue] = useState(String(value));

  const handleChange = (text) => {
    const numeric = text.replace(/[^0-9]/g, "");
    setInternalValue(numeric);
    const num = parseInt(numeric, 10);
    if (!isNaN(num)) {
      onChange(Math.max(min, Math.min(max, num)));
    }
  };

  const increase = () => {
    const newVal = Math.min(max, parseInt(internalValue || 0, 10) + step);
    setInternalValue(String(newVal));
    onChange(newVal);
  };

  const decrease = () => {
    const newVal = Math.max(min, parseInt(internalValue || 0, 10) - step);
    setInternalValue(String(newVal));
    onChange(newVal);
  };

  return (
    <View>
      <View className="flex-row items-center bg-slate-800 rounded-2xl px-4  border border-[#334155]">
        <TouchableOpacity onPress={decrease}>
          <ArrowDownIcon size={20} color="#94a3b8" />
        </TouchableOpacity>

        <TextInput
          className="text-white text-center flex-1 text-lg"
          keyboardType="numeric"
          value={internalValue}
          onChangeText={handleChange}
        />

        <TouchableOpacity onPress={increase}>
          <ArrowUpIcon size={20} color="#94a3b8" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NumberInput;
