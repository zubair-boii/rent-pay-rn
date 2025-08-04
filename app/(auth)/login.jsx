import { router } from "expo-router";
import { EnvelopeIcon, LockIcon } from "phosphor-react-native";
import React, { useState } from "react";
import {
  Alert,
  Keyboard,
  Pressable,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import BackButton from "../../components/BackButton";
import CustomButton from "../../components/CustomButton";
import InputField from "../../components/Input";
import Typo from "../../components/Typo";
import { useAuth } from "../../context/authContext";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();

  const handleSubmit = async () => {
    console.log("hello");
    if (!email || !password) {
      Alert.alert("Sign in", "Please fill all the fields");
      return;
    }

    setIsLoading(true);

    try {
      const res = await login(email, password);

      if (res.success === false) {
        Alert.alert("Sign in", res.msg);
      }
    } catch (error) {
      console.error("Error during login:", error);
      Alert.alert("Sign in", "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-slate-800 flex-1">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <View className="m-5">
            {/* Back Button */}
            <BackButton />

            <View className="mt-[30%]">
              <Typo size={30} fontWeight="800">
                Hey,
              </Typo>
              <Typo size={30} fontWeight="800">
                Welcome Back
              </Typo>
            </View>

            <View className="mt-[10%]">
              <Typo size={15} color="#90a1b9" fontWeight="400">
                Your rental dashboard is just a login away
              </Typo>
            </View>

            {/* Input Fields */}
            <View className="mt-[10%] gap-5">
              <InputField
                Icon={EnvelopeIcon}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
              />
              <InputField
                Icon={LockIcon}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <View className="mt-[4%] self-end">
              <TouchableOpacity onPress={() => {}}>
                <Typo>Forgot Password?</Typo>
              </TouchableOpacity>
            </View>

            <View className="mt-[5%]">
              <CustomButton
                onPress={handleSubmit}
                fontSize={25}
                fontWeight="800"
                textColor="#1d293d"
                loading={isLoading}
              >
                Sign in
              </CustomButton>
            </View>

            <View className="mt-5 flex-row justify-center items-center">
              <Typo color="#90a1b9">Don't have an account? </Typo>
              <Pressable onPress={() => router.navigate("./register")}>
                <Typo color="#3fbdf1" fontWeight="800">
                  Sign up
                </Typo>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default LoginScreen;
