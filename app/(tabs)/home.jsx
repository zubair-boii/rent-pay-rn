import { MagnifyingGlassIcon, Users } from "phosphor-react-native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";
import Input from "../../components/Input";
import TenantCard from "../../components/TenantCard";
import Typo from "../../components/Typo";
import { ThemeColors } from "../../constants/Colors";
import { useAuth } from "../../context/authContext";
import { collection, getDoc, getDocs, onSnapshot } from "firebase/firestore";
import { firestore } from "../../config/firebase";

import FloatingAddButton from "../../components/FloatingAddButton";
import { useRouter } from "expo-router";

const HomeScreen = () => {
  const { user } = useAuth();
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!user?.uid) return;

    const tenantRef = collection(firestore, "users", user.uid, "tenants");

    const unsubscribe = onSnapshot(tenantRef, (snapshot) => {
      const tenantList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Sort by shop number (if numeric)
      tenantList.sort((a, b) => parseInt(a.id) - parseInt(b.id));

      setTenants(tenantList);
      setLoading(false);
    });

    return () => unsubscribe(); // cleanup listener when component unmounts
  }, [user?.uid]);

  const showDate = () => {
    const date = new Date();
    const formattedDate = date.toLocaleDateString("en-GB");

    return formattedDate;
  };

  return (
    <SafeAreaView className="bg-slate-900 flex-1 px-4 pt-16">
      {/* Header Card */}
      <View className="bg-slate-800 p-3 rounded-full mb-6 ">
        <View className="flex-row justify-between items-center">
          {/* Text Block */}
          <View className="flex-1 pl-4">
            <Typo size={20} fontWeight="600" className="text-white mb-1">
              Hi, {user?.userName}
            </Typo>
            <Typo size={15} fontWeight="300" color={ThemeColors.tint}>
              manage your rents
            </Typo>
          </View>

          {/* Profile Image */}
          <Image
            className="w-20  rounded-full aspect-square"
            resizeMode="cover"
            source={{
              uri:
                user?.image ||
                `https://ui-avatars.com/api/?name=${user?.userName || ""}`,
            }}
          />
        </View>
      </View>

      {/* Search Input */}
      <View className="flex-row">
        <View className="pr-[3%]  w-[80%]">
          <Input
            borderRadius={40}
            containerStyle={{
              innerWidth: "100%",
              width: "100%",
              outerWidth: "100%",
            }}
            placeholder="Search"
            SuffixIcon={MagnifyingGlassIcon}
            paddingVertical={"3%"}
          />
        </View>

        <View className="justify-center items-center">
          <FloatingAddButton
            onPress={() => {
              router.push("../(screens)/create");
            }}
          />
        </View>
      </View>

      {/* date */}
      <View style={{ alignSelf: "flex-end", marginVertical: 10 }}>
        <Typo color={ThemeColors.tint}>{showDate()}</Typo>
      </View>

      {/* Cards */}
      <Typo size={20} fontWeight="600" className="text-white mb-1">
        Rents:
      </Typo>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {loading ? (
          <View className="items-center justify-center">
            <ActivityIndicator color={"white"} size={"large"} />
          </View>
        ) : tenants.length == 0 ? (
          <Typo className="text-white text-center my-10">
            ✅ No tenants found
          </Typo>
        ) : (
          tenants.map((tenant) => (
            <TenantCard
              key={tenant.id}
              name={tenant.name}
              dateJoined={tenant.dateJoined}
              hasPaid={tenant.hasPaid}
              phoneNumber={tenant.phoneNumber}
              shopNumber={tenant.id}
              amount={tenant.amount}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
