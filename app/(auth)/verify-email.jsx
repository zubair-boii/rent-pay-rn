import {useRouter} from "expo-router";
import {CheckCircleIcon} from "phosphor-react-native";
import React, {useCallback, useEffect, useState} from "react";
import {
    Alert,
    Keyboard,
    Pressable,
    ScrollView,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import Typo from "../../components/Typo";
import {auth} from "../../config/firebase";
import CustomButton from "../../components/CustomButton";
import {ThemeColors} from "../../constants/Colors";
import {sendEmailVerification} from "firebase/auth";

const VerifyEmailScreen = () => {
    const router = useRouter();
    const [cooldown, setCooldown] = useState(0);
    const [verified, setVerified] = useState(false);
    const [isChecking, setIsChecking] = useState(false);

    // Cooldown timer
    useEffect(() => {
        let interval;
        if (cooldown > 0) {
            interval = setInterval(() => {
                setCooldown((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [cooldown]);

    // Check verification status when screen is focused
    useEffect(() => {
        const checkEmailVerified = async () => {
            await auth.currentUser?.reload();
            setVerified(auth.currentUser?.emailVerified ?? false);
        };

        checkEmailVerified();
    }, []);

    const handleRefresh = async () => {
        setIsChecking(true);
        try {
            await auth.currentUser?.reload();
            const isNowVerified = auth.currentUser?.emailVerified;
            setVerified(isNowVerified);

            if (isNowVerified) {
                Alert.alert("Success", "Your email is verified!");
                router.replace("/(tabs)/home");
            } else {
                Alert.alert("Still not verified", "Check your inbox and try again.");
            }
        } catch (error) {
            Alert.alert("Error", error.message || "Failed to refresh verification status.");
        } finally {
            setIsChecking(false);
        }
    };

    const handleEmailVerification = async () => {
        if (cooldown > 0) {
            Alert.alert("Please wait", `Try again in ${cooldown} seconds.`);
            return;
        }

        try {
            await auth.currentUser?.reload();
            await sendEmailVerification(auth.currentUser);
            setCooldown(60);
            Alert.alert("Sent", "Verification link has been sent to your email.");
        } catch (error) {
            Alert.alert("Error", error.message || "Could not send verification email.");
        }
    };

    return (
        <SafeAreaView className="bg-slate-800 flex-1">
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView keyboardShouldPersistTaps="handled">
                    <View className="m-5 justify-center">
                        <View className="mt-[30%]">
                            <Typo size={30} fontWeight="800">Wait,</Typo>
                        </View>

                        <Typo size={30} fontWeight="800">Verify your email</Typo>

                        <View className="mt-[10%]">
                            <Typo size={15} color="#90a1b9" fontWeight="400">
                                Verify your email by clicking the link we just sent you.
                            </Typo>
                        </View>

                        <View className="items-center gap-3 my-5">
                            <CheckCircleIcon size={100} color={"green"} weight={"fill"}/>
                            <Typo size={14} color={ThemeColors.dimText}>
                                Check your inbox (and spam folder) to verify your email address.
                            </Typo>
                        </View>

                        <View className="mt-5 flex-row justify-center items-center">
                            <Typo color="#90a1b9">Didn&#39;t receive the email? </Typo>
                            <Pressable onPress={handleEmailVerification}>
                                <Typo color="#3fbdf1" fontWeight="800">
                                    {cooldown > 0 ? `Wait ${cooldown}s` : "Resend Email"}
                                </Typo>
                            </Pressable>
                        </View>

                        <View className="mt-5 justify-center items-center">
                            <CustomButton onPress={handleRefresh} loading={isChecking}>
                                Continue
                            </CustomButton>
                        </View>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

export default VerifyEmailScreen;
