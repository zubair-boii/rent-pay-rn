import { router } from "expo-router";
import { EnvelopeIcon, LockIcon, UserIcon } from "phosphor-react-native";
import React, { useState } from "react";
import {
  Alert,
  Keyboard,
  Pressable,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import BackButton from "../../components/BackButton";
import CustomButton from "../../components/CustomButton";
import InputField from "../../components/Input";
import Typo from "../../components/Typo";
import { useAuth } from "../../context/authContext";

const SignupScreen = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();

  const handleSubmit = async () => {
    if (!email || !password || !userName) {
      Alert.alert("Sign up", "Please fill all the fields");
      return;
    }

    setIsLoading(true);

    try {
      const res = await register(email, password, userName);

      if (res.success === false) {
        Alert.alert("Sign up", res.msg);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      Alert.alert("Sign up", "Something went wrong.");
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
                Let's
              </Typo>
              <Typo size={30} fontWeight="800">
                Get you started
              </Typo>
            </View>

            <View className="mt-[10%]">
              <Typo size={15} color="#90a1b9" fontWeight="400">
                Sign up to manage your rents details
              </Typo>
            </View>

            {/* Input Fields */}
            <View className="mt-[10%] gap-5">
              <InputField
                Icon={UserIcon}
                placeholder="Username"
                value={userName}
                onChangeText={setUserName}
              />
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

            <View className="mt-[5%]">
              <CustomButton
                onPress={handleSubmit}
                fontSize={25}
                fontWeight="800"
                textColor="#1d293d"
                loading={isLoading}
              >
                Sign up
              </CustomButton>
            </View>

            <View className="mt-5 flex-row justify-center items-center">
              <Typo color="#90a1b9">Already have an account? </Typo>
              <Pressable onPress={() => router.navigate("./login")}>
                <Typo color="#3fbdf1" fontWeight="800">
                  Login
                </Typo>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default SignupScreen;
