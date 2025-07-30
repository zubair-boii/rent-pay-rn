import { useLocalSearchParams, useRouter } from "expo-router";
import { TrashIcon } from "phosphor-react-native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Checkbox } from "expo-checkbox";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";

import BackButton from "../../components/BackButton";
import CustomButton from "../../components/CustomButton";
import Input from "../../components/Input";
import Typo from "../../components/Typo";
import NumberInput from "../../components/NumberInput";
import DateInput from "../../components/DateInput";
import { firestore } from "../../config/firebase";
import { useAuth } from "../../context/authContext";
import { ThemeColors } from "../../constants/Colors";

export default function TenantDetailsScreen() {
  const params = useLocalSearchParams();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const origDetails = {
    name: params.name || "",
    dateJoined: params.dateJoined || "",
    hasPaid: params.hasPaid === true, // convert string to boolean
    shopNumber: parseInt(params.shopNumber) || 0,
    phoneNumber: params.phoneNumber || "",
    amount: params.amount || "",
  };

  const [details, setDetails] = useState(origDetails);

  const handleChange = (field, value) => {
    setDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleShopNumberStepChange = (value) => {
    setDetails((prev) => ({
      ...prev,
      shopNumber: value,
    }));
  };

  const handleSaveDetails = async () => {
    const { name, phoneNumber, dateJoined, shopNumber, amount } = details;
    if (!name || !phoneNumber || !dateJoined || !shopNumber || !amount) {
      Alert.alert("Error", "Please fill all the fields");
      return;
    }

    try {
      setLoading(true);
      const tenantRef = doc(
        firestore,
        "users",
        user.uid,
        "tenants",
        shopNumber.toString()
      );

      await updateDoc(tenantRef, details);

      console.log("✅ Tenant updated!");
    } catch (error) {
      console.log("Error adding tenant:", error);
    } finally {
      setLoading(false);
      router.back();
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      const tenantRef = doc(
        firestore,
        "users",
        user.uid,
        "tenants",
        details.shopNumber.toString()
      );
      await deleteDoc(tenantRef);
      console.log("✅ Tenant deleted!");
    } catch (error) {
      console.log("Error deleting tenant:", error);
    } finally {
      setLoading(false);
      router.back();
    }
  };

  const handleShowUpdateAlert = () => {
    Alert.alert(
      "Update Tenant",
      "Are you sure you want to save these changes?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Confirm",
          style: "default",
          onPress: () => handleSaveDetails(),
        },
      ]
    );
  };

  // 🔍 Compare here — runs on every render, which is what we want
  const hasChanges = JSON.stringify(details) !== JSON.stringify(origDetails);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#0f172a" }}
      className="px-10 pt-8"
    >
      {/* Header */}
      <View className="flex-row justify-around items-center mb-6 gap-10">
        <BackButton />
        <Text className="text-white text-xl font-semibold self-center">
          Edit Tenant Details
        </Text>

        <View>
          <TouchableOpacity
            className="bg-red-500 rounded-full p-3"
            onPress={handleDelete}
          >
            <TrashIcon color="white" size={25} />
          </TouchableOpacity>
        </View>
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

            {/* delete tenant */}
          </View>

          {/* Save Button */}
          <View className="mt-[20%]">
            {hasChanges && (
              <CustomButton onPress={handleShowUpdateAlert} loading={loading}>
                Save Details
              </CustomButton>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
