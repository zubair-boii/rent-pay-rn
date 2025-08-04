import React from "react";
import { SafeAreaView, View } from "react-native";
import BackButton from "../../components/BackButton";
import Typo from "../../components/Typo";

const PrivacyPolicy = () => {
  const text = `This app is created and used by me Zubair Khan for personal purposes only.

- No personal data is shared with third parties.
- No tracking or analytics are used.
- Profile information and images are stored securely using Firebase and Cloudinary.
- Only I (the developer and user) can access this app.

If you have any questions about this policy, please contact me directly.

Last updated: July 23, 2025`;

  return (
    <SafeAreaView className="bg-slate-800 px-[5%] flex-1 ">
      <View className="absolute pt-[20%] pl-[8%]">
        <BackButton />
      </View>

      <View className="justify-center items-center flex-1">
        <Typo size={15}>{text}</Typo>
      </View>
    </SafeAreaView>
  );
};

export default PrivacyPolicy;
