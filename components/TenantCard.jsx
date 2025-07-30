import { useRouter } from "expo-router";
import {
  CalendarIcon,
  CircleIconIcon,
  MoneyIcon,
  PhoneIcon,
  StorefrontIcon,
  CheckIcon,
} from "phosphor-react-native";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import * as Linking from "expo-linking";

import { ThemeColors } from "../constants/Colors";
import Typo from "./Typo";
import LineSeparator from "./Separator";

const InfoRow = ({ icon, label, value }) => (
  <View className="flex-row justify-between items-center">
    <View className="flex-row items-center gap-2">
      {icon}
      <Typo>{label}</Typo>
    </View>
    <Typo>{value || "-"}</Typo>
  </View>
);

const StatusBadge = ({ hasPaid }) => (
  <View
    className={`px-3 py-1 rounded-full ${
      hasPaid === "true" || hasPaid === true ? "bg-green-600" : "bg-red-600"
    }`}
  >
    <Typo className="text-white font-semibold text-sm">
      {hasPaid === "true" || hasPaid === true ? "Paid" : "Unpaid"}
    </Typo>
  </View>
);

const TenantCard = ({
  name,
  shopNumber,
  phoneNumber,
  dateJoined,
  hasPaid,
  amount,
}) => {
  const router = useRouter();

  const goToDetails = () => {
    router.push({
      pathname: `/(tenant)/${shopNumber}`, // ✅ Proper template literal
      params: {
        name,
        dateJoined,
        hasPaid,
        shopNumber,
        phoneNumber,
        amount,
      },
    });
  };

  const ShowAlertCall = () => {
    Linking.openURL(`tel: ${phoneNumber}`);
  };

  const handleCheck = () => {};

  return (
    <View className="bg-slate-800 p-5 rounded-2xl shadow-sm shadow-black/30 space-y-5 mb-5">
      <TouchableOpacity onLongPress={goToDetails}>
        {/* Header */}
        <View className="flex-row justify-between items-center">
          <Typo size={20} fontWeight="600">
            {name}
          </Typo>

          <View className="flex-row items-center space-x-1 gap-3">
            <Typo color={ThemeColors.tint}>{dateJoined}</Typo>
            <CalendarIcon size={16} color={ThemeColors.tint} />
          </View>
        </View>

        {/* Info Rows */}
        <View className="space-y-4 mt-3">
          <View className="gap-3">
            <InfoRow
              icon={<MoneyIcon size={18} color="#94a3b8" />}
              label="Amount"
              value={`Rs. ${amount}`}
            />
            <InfoRow
              icon={<StorefrontIcon size={18} color="#94a3b8" />}
              label="Shop No"
              value={shopNumber}
            />
            <InfoRow
              icon={<PhoneIcon size={18} color="#94a3b8" />}
              label="Phone"
              value={phoneNumber}
            />
          </View>
          <View className="flex-row justify-between items-center mt-3">
            <View className="flex-row gap-2">
              <CircleIconIcon size={18} color="#94a3b8" />
              <Typo>Status</Typo>
            </View>
            <View>
              <StatusBadge hasPaid={hasPaid} />
            </View>
          </View>

          {/*seperator*/}
          <View style={{ margin: 5 }}>
            <LineSeparator thickness={0.5} color={ThemeColors.dimText} />
          </View>

          {/* Button */}
          <View className="flex-row justify-between items-center">
            <TouchableOpacity
              style={{ backgroundColor: ThemeColors.tint }}
              className="rounded-3xl  items-center justify-center p-3"
              onPress={ShowAlertCall}
            >
              <PhoneIcon
                size={30}
                color={ThemeColors.background[100]}
                weight="fill"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleCheck}
              style={{ backgroundColor: ThemeColors.tint }}
              className="rounded-3xl  items-center justify-center p-3"
            >
              <CheckIcon
                size={30}
                color={ThemeColors.background[100]}
                weight="bold"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Call Button */}
      </TouchableOpacity>
    </View>
  );
};

export default TenantCard;
