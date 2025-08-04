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
import { firestore } from "../../config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

import BackButton from "../../components/BackButton";
import CustomButton from "../../components/CustomButton";
import Input from "../../components/Input";
import Typo from "../../components/Typo";
import NumberInput from "../../components/NumberInput";
import DateInput from "../../components/DateInput";
import { useAuth } from "../../context/authContext";
import { useRouter } from "expo-router";

export default function Create() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [details, setDetails] = useState({
    name: "",
    dateJoined: "",
    hasPaid: false, // convert string to boolean
    shopNumber: "",
    phoneNumber: "",
    amount: "",
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

  const saveDetails = async () => {
    const { name, phoneNumber, dateJoined, shopNumber, amount } = details;
    if (!name || !phoneNumber || !dateJoined || !shopNumber || !amount) {
      Alert.alert("Error", "Please fill all the fields");
      return;
    }

    setLoading(true);
    try {
      const tenantRef = doc(
        firestore,
        "users",
        user.uid,
        "tenants",
        shopNumber.toString()
      );

      // Check if shop number is already taken
      const existingDoc = await getDoc(tenantRef);
      if (existingDoc.exists()) {
        Alert.alert("Duplicate", `Shop No. ${shopNumber} is already occupied.`);
        setLoading(false);
        return;
      }
      // if not then create a new document
      await setDoc(tenantRef, details);

      console.log("✅ Tenant added!");
    } catch {
      console.error("❌ Error adding tenant:", error);
    } finally {
      setLoading(false);
      router.back();
    }
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
          Create a new Tenant
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
              onChangeText={(value) => handleChange("name", value)}
            />
          </View>

          {/* Phone */}
          <View className="gap-2">
            <Typo>Phone:</Typo>
            <Input
              paddingVertical={3}
              value={details.phoneNumber}
              onChangeText={(value) => handleChange("phoneNumber", value)}
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
                onChangeText={(value) => handleChange("amount", value)}
              />
            </View>
          </View>

          <View className="w-full flex-row gap-[5%] ">
            {/* Date and datepicker */}
            <View className="w-1/2 mt-4">
              <DateInput
                label="Date Joined"
                value={details.dateJoined}
                onChange={(value) => handleChange("dateJoined", value)}
              />
            </View>

            {/* Paid Checkbox */}
            {/* <View className="flex-row gap-10 items-center mt-10 ">
              <Typo>Paid: </Typo>

              <Checkbox
                value={details.hasPaid}
                style={{
                  width: 25,
                  height: 25,
                }}
                onValueChange={(value) => handleChange("hasPaid", value)}
              ></Checkbox>
            </View> */}
          </View>

          {/* Save Button */}
          <View className="mt-[20%]">
            <CustomButton
              onPress={saveDetails}
              textColor="#0f172a"
              loading={loading}
            >
              Add Tenant
            </CustomButton>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
