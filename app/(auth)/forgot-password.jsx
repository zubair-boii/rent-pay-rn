import {useRouter} from "expo-router";
import {EnvelopeIcon} from "phosphor-react-native";
import React, {useState} from "react";
import {
    Alert,
    Keyboard,
    Pressable,
    ScrollView,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

import BackButton from "../../components/BackButton";
import CustomButton from "../../components/CustomButton";
import InputField from "../../components/Input";
import Typo from "../../components/Typo";
import {useAuth} from "../../context/authContext";

const ForgotPasswordScreen = () => {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const {forgotPassword} = useAuth();

    const handleSubmit = async () => {
        if (!email) {
            Alert.alert("Error", "Please enter your email.");
            return;
        }

        try {
            setIsLoading(true);
            await forgotPassword(email);
            Alert.alert("Success", "Password reset email sent!");
        } catch (error) {
            console.error("Password reset error:", error);
            Alert.alert("Error", error.message || "Something went wrong.");
        } finally {
            setIsLoading(false);
            router.back()
            setEmail("")
        }
    };

    return (
        <SafeAreaView className="bg-slate-800 flex-1">
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView keyboardShouldPersistTaps="handled">
                    <View className="m-5">
                        <BackButton/>

                        <View className="mt-[30%]">
                            <Typo size={30} fontWeight="800">
                                Forgot your password
                            </Typo>
                        </View>

                        <View className="mt-[10%]">
                            <Typo size={15} color="#90a1b9" fontWeight="400">
                                Type your email to reset your password.
                            </Typo>
                        </View>

                        <View className="mt-[10%] gap-5">
                            <InputField
                                Icon={EnvelopeIcon}
                                placeholder="Email"
                                value={email}
                                onChangeText={setEmail}
                            />
                        </View>

                        <View className="mt-[5%]">
                            <CustomButton
                                onPress={handleSubmit}
                                fontSize={20}
                                fontWeight="800"
                                textColor="#1d293d"
                                loading={isLoading}
                            >
                                Send Code
                            </CustomButton>
                        </View>

                        <View className="mt-5 flex-row justify-center items-center">
                            <Typo color="#90a1b9">Don&#39;t have an account? </Typo>
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

export default ForgotPasswordScreen;
