import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Checkbox } from "expo-checkbox";

import BackButton from "../../components/BackButton";
import CustomButton from "../../components/CustomButton";
import Input from "../../components/Input";
import Typo from "../../components/Typo";
import NumberInput from "../../components/NumberInput";
import DateInput from "../../components/DateInput";

export default function TenantDetailsScreen() {
  const params = useLocalSearchParams();

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false); // hide picker after selection
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split("T")[0]; // e.g. "2025-07-28"
      handleChange("dateJoined", formattedDate);
    }
  };

  const [details, setDetails] = useState({
    name: params.name || "",
    dateJoined: params.dateJoined || "",
    hasPaid: params.hasPaid === "true", // convert string to boolean
    shopNumber: parseInt(params.shopNumber) || 0,
    phoneNumber: params.phoneNumber || "",
    amount: params.amount || "",
  });

  const handleChange = (field, value) => {
    setDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleShopNumberStepChange = (value) => {
    setDetails((prev) => ({
      ...prev,
      shopNumber: value,
    }));
  };

  const saveDetails = () => {
    const { name, phoneNumber, dateJoined, shopNumber, amount } = details;
    if (!name || !phoneNumber || !dateJoined || !shopNumber || !amount) {
      Alert.alert("Error", "Please fill all the fields");
      return;
    }

    // TODO: UPLOAD TO DB
    console.log("good to go");
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#0f172a" }}
      className="px-10 pt-8"
    >
      {/* Header */}
      <View className="flex-row justify-between items-center mb-6">
        <BackButton />
        <Text className="text-white text-xl font-semibold mr-[25%]">
          Edit Tenant Details
        </Text>
      </View>

      {/* Content */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}
        style={{ flex: 1 }}
      >
        <ScrollView className="py-3 space-y-4">
          {/* Name */}
          <View className="gap-2">
            <Typo>Name:</Typo>
            <Input
              paddingVertical={3}
              value={details.name}
              onChangeText={(val) => handleChange("name", val)}
            />
          </View>

          {/* Phone */}
          <View className="gap-2">
            <Typo>Phone:</Typo>
            <Input
              paddingVertical={3}
              value={details.phoneNumber}
              onChangeText={(val) => handleChange("phoneNumber", val)}
            />
          </View>

          {/* Shop Number & Amount */}
          <View className="flex-row justify-between pt-2">
            <View className="w-[50%] pr-[2%] gap-2 ">
              <Typo>Shop Number:</Typo>
              <NumberInput
                value={details.shopNumber}
                onChange={handleShopNumberStepChange}
              />
            </View>

            <View className="w-[50%] pl-[2%] gap-2">
              <Typo>Amount:</Typo>
              <Input
                paddingVertical={3}
                value={details.amount}
                onChangeText={(val) => handleChange("amount", val)}
              />
            </View>
          </View>

          <View className="w-full flex-row gap-[5%] ">
            {/* Date and datepicker */}
            <View className="w-1/2 mt-4">
              <DateInput
                label="Date Joined"
                value={details.dateJoined}
                onChange={(val) => handleChange("dateJoined", val)}
              />
            </View>

            {/* Paid Checkbox */}
            <View className="flex-row gap-10 items-center mt-10 ">
              <Typo>Paid: </Typo>

              <Checkbox
                value={details.hasPaid}
                onValueChange={(val) => handleChange("hasPaid", val)}
                style={{
                  width: 25,
                  height: 25,
                }}
              ></Checkbox>
            </View>
          </View>

          {/* Save Button */}
          <View className="mt-[20%]">
            <CustomButton onPress={saveDetails}>Save Details</CustomButton>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
