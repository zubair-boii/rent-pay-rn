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
import { TouchableOpacity, View, Text } from "react-native";
import * as Linking from "expo-linking";

import { ThemeColors } from "../constants/Colors";
import Typo from "./Typo";
import LineSeparator from "./Separator";

const InfoRow = ({ icon, label, value, paid }) => (
  <View className="flex-row justify-between items-center">
    <View className="flex-row items-center gap-2">
      {icon}
      <Text
        style={
          paid
            ? { textDecorationLine: "line-through", color: ThemeColors.dimText }
            : { color: ThemeColors.text }
        }
      >
        {label}
      </Text>
    </View>

    {/* value */}
    <Text
      style={
        paid
          ? { textDecorationLine: "line-through", color: ThemeColors.dimText }
          : { color: ThemeColors.text }
      }
    >
      {value || "-"}
    </Text>
  </View>
);

const TenantCard = ({
  name,
  shopNumber,
  phoneNumber,
  dateJoined,
  hasPaid,
  amount,
  onCheck,
  onUndo,
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

  return (
    <View
      className={
        hasPaid
          ? "bg-slate-950 p-5 rounded-2xl shadow-sm shadow-black/30 space-y-5 mb-5"
          : "bg-slate-800 p-5 rounded-2xl shadow-sm shadow-black/30 space-y-5 mb-5"
      }
    >
      <TouchableOpacity onLongPress={goToDetails}>
        {/* Header */}
        <View className="flex-row justify-between items-center">
          <Typo
            size={20}
            fontWeight="600"
            style={
              hasPaid
                ? {
                    textDecorationLine: "line-through",
                    color: ThemeColors.dimText,
                  }
                : {}
            }
          >
            {name}
          </Typo>

          <View className="flex-row items-center space-x-1 gap-3">
            <Typo
              color={ThemeColors.tint}
              style={
                hasPaid
                  ? {
                      textDecorationLine: "line-through",
                      color: ThemeColors.dimText,
                    }
                  : {}
              }
            >
              {dateJoined}
            </Typo>
            <CalendarIcon
              size={16}
              color={hasPaid ? ThemeColors.dimText : ThemeColors.dimText}
            />
          </View>
        </View>

        {/* Info Rows */}
        <View className="space-y-4 mt-3">
          <View className="gap-3">
            <InfoRow
              icon={<MoneyIcon size={18} color="#94a3b8" />}
              paid={hasPaid}
              label="Amount"
              value={`Rs. ${amount}`}
            />
            <InfoRow
              icon={<StorefrontIcon size={18} color="#94a3b8" />}
              paid={hasPaid}
              label="Shop No"
              value={shopNumber}
            />
            <InfoRow
              icon={<PhoneIcon size={18} color="#94a3b8" />}
              paid={hasPaid}
              label="Phone"
              value={phoneNumber}
            />
            <InfoRow
              icon={<CircleIconIcon size={18} color="#94a3b8" />}
              paid={hasPaid}
              label="Status"
              value={hasPaid === "true" || hasPaid === true ? "Paid" : "Unpaid"}
            />
          </View>

          {/*seperator*/}
          <View style={{ margin: 5 }}>
            <LineSeparator thickness={0.5} color={ThemeColors.dimText} />
          </View>

          {/* Button */}
          <View className="flex-row justify-end gap-3 items-center">
            {hasPaid === "false" || hasPaid === false ? (
              <TouchableOpacity
                style={{ backgroundColor: ThemeColors.tint }}
                className="rounded-2xl  items-center justify-center p-3"
                onPress={ShowAlertCall}
              >
                <PhoneIcon
                  size={20}
                  color={ThemeColors.background[100]}
                  weight="fill"
                />
              </TouchableOpacity>
            ) : null}

            {/* Button */}
            {hasPaid === "false" || hasPaid === false ? (
              <TouchableOpacity
                onPress={onCheck}
                style={{ backgroundColor: ThemeColors.tint }}
                className="rounded-2xl  items-center justify-center p-3"
              >
                <CheckIcon
                  size={20}
                  color={ThemeColors.background[100]}
                  weight="bold"
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={onUndo}
                style={{ backgroundColor: ThemeColors.tint }}
                className="rounded-2xl  items-center justify-center p-3"
              >
                <Typo color={ThemeColors.background[100]}>Undo</Typo>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Call Button */}
      </TouchableOpacity>
    </View>
  );
};

export default TenantCard;
