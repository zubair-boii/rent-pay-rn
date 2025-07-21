import { useRouter } from "expo-router";
import { CaretLeftIcon } from "phosphor-react-native";
import React from "react";
import { TouchableOpacity } from "react-native";

const BackButton = ({ style, iconSize = 26, onPress }) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.back()}
      className="bg-slate-700 self-start rounded-2xl p-3"
    >
      <CaretLeftIcon size={iconSize} color="white" weight="bold" />
    </TouchableOpacity>
  );
};

export default BackButton;
