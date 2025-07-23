import * as ImagePicker from "expo-image-picker";
import { PencilSimpleLineIcon } from "phosphor-react-native";
import React, { useEffect, useState } from "react";

import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

import { useRouter } from "expo-router";
import BackButton from "../../components/BackButton";
import CustomButton from "../../components/CustomButton";
import Input from "../../components/Input";
import Typo from "../../components/Typo";
import { useAuth } from "../../context/authContext";
import { getProfileImage } from "../../services/image_service";
import { updateUser } from "../../services/user_service";

const ProfileModalScreen = () => {
  const { user, refreshUserData } = useAuth();
  const [userData, setUserData] = useState({
    username: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      setUserData({
        username: user.userName || "",
        image: user.image || null,
      });
    }
  }, [user]);

  const onImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onUpdateProfile = async () => {
    const { username, image } = userData;

    if (!username.trim()) {
      Alert.alert("Update Profile", "Please enter a username.");
      return;
    }

    setLoading(true);

    try {
      const res = await updateUser(user.uid, { userName: username, image });
      setLoading(false);

      if (res.success) {
        await refreshUserData(user.uid);
        router.back();
      }

      Alert.alert("Update Profile", res.msg);
    } catch (error) {
      console.log(error);
      Alert.alert("Update Profile", `Something went wrong. ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-800">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}
      >
        <KeyboardAwareScrollView
          contentContainerStyle={{ paddingBottom: 140 }}
          keyboardShouldPersistTaps="handled"
          enableOnAndroid
          className="px-[5%]"
        >
          <View className="pt-[4%]">
            <BackButton />
            <Typo
              className="text-center mt-[2%]"
              size={20}
              fontWeight="600"
              color="#fff"
            >
              Update Profile
            </Typo>
          </View>

          {/* Profile Image */}
          <View className="relative self-center w-[50%] aspect-square my-[10%]">
            <Image
              source={getProfileImage(userData.image)}
              className="w-full h-full rounded-full"
              resizeMode="cover"
            />
            <TouchableOpacity
              className="absolute bottom-0 right-0 bg-[#3fbdf1] p-[5%] rounded-full border border-[#3fbdf1] shadow shadow-black"
              onPress={onImagePick}
            >
              <PencilSimpleLineIcon size={18} color="white" />
            </TouchableOpacity>
          </View>

          {/* Form Fields */}
          <View className="gap-[6%]">
            <View>
              <Typo className="mb-[1%]" color="#90a1b9">
                Name
              </Typo>
              <Input
                placeholder="Name"
                value={userData.username}
                onChangeText={
                  (value) => setUserData({ ...userData, username: value }) // ✅ Fixed key
                }
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
        {/* Update Profile Button */}
        <View className="bg-slate-800 px-[5%] pb-[6%] pt-4">
          <CustomButton onPress={onUpdateProfile} loading={loading}>
            Update Profile
          </CustomButton>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ProfileModalScreen;
