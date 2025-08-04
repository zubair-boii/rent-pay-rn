import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import Typo from "../../components/Typo";

const Settings = () => {
  return (
    <SafeAreaView className="bg-slate-800 flex-1 justify-center items-center">
      <Typo size={20}>Sorry this page is still in development</Typo>
    </SafeAreaView>
  );
};

export default Settings;
