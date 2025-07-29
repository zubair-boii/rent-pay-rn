// components/DateInput.js

import React, { useState } from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { CalendarIcon } from "phosphor-react-native";

export default function DateInput({ label = "Date", value, onChange }) {
  const [show, setShow] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShow(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split("T")[0];
      onChange(formattedDate);
    }
  };

  return (
    <View className="gap-2">
      <Text className="text-white font-medium">{label}:</Text>
      <TouchableOpacity
        className="bg-slate-800 rounded-xl py-3 px-4"
        onPress={() => setShow(true)}
      >
        <View className="flex-row justify-between items-center">
          <Text className="text-white">{value ? value : "Select a date"}</Text>
          <CalendarIcon color="white" size={20} />
        </View>
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={value ? new Date(value) : new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleDateChange}
        />
      )}
    </View>
  );
}
