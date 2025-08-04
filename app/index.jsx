import React from "react";
import { Image, View } from "react-native";

const Index = () => {


  return (
    <View className="flex-1 items-center justify-center bg-slate-800">
      <Image
        source={require("../assets/images/logo-text.png")}
        className="w-[65%]"
        resizeMode="contain"
      />
    </View>
  );
};

export default Index;
