import { useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import Typo from "../../components/Typo";

const WelcomeScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaProvider className="bg-slate-800 flex-1">
      {/* Top-right Sign in link */}
      <View className="items-end p-6">
        <TouchableOpacity
          onPress={() => router.push("./login")}
          className="bg-slate-700 self-end rounded-2xl p-3"
        >
          <Typo fontWeight="600" className="text-white">
            Sign in
          </Typo>
        </TouchableOpacity>
      </View>

      {/* Main Image */}
      <View className="flex-1 items-center justify-center px-6">
        <Animated.Image
          entering={FadeIn.duration(1000)}
          source={require("../../assets/Illustrations/1.png")}
          resizeMode="contain"
          className="w-full max-h-[300px]"
        />
      </View>

      {/* Text + Bottom Sign In Button */}
      <View className="flex-1 px-6  justify-center gap-9 ">
        <Animated.View
          entering={FadeInDown.duration(1000).springify().damping(12)}
          className="items-center "
        >
          <Typo size={30} fontWeight="800">
            Manage your rent with
          </Typo>
          <Typo size={30} fontWeight="800">
            ease and efficiency.
          </Typo>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.duration(1000)
            .delay(100)
            .springify()
            .damping(12)}
          className="items-center "
        >
          <Typo color="#90a1b9" size={17} fontWeight="300">
            Designed and Developed
          </Typo>
          <Typo color="#90a1b9" size={17} fontWeight="300">
            with ❤ by zubair khan.
          </Typo>
        </Animated.View>

        {/* sign in button */}
        <Animated.View
          entering={FadeInDown.duration(1000)
            .delay(200)
            .springify()
            .damping(12)}
        >
          <CustomButton
            onPress={() => {
              router.push("./register");
            }}
            backgroundColor="#3fbdf1"
          >
            <Typo size={22} color="#0d1026" fontWeight="900">
              Get Started
            </Typo>
          </CustomButton>
        </Animated.View>
      </View>
    </SafeAreaProvider>
  );
};

export default WelcomeScreen;
