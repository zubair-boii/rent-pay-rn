import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { Alert, SafeAreaView, View } from "react-native";
import CustomButton from "../../components/CustomButton";
import { auth } from "../../config/firebase";

const HomeScreen = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await signOut(auth);
      setIsLoading(false);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <SafeAreaView className="bg-slate-800 flex-1 p-[4%]">
      <View>
        <CustomButton
          onPress={handleLogout}
          fontSize={25}
          textColor="#1d293d"
          loading={isLoading}
        >
          Logout
        </CustomButton>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
