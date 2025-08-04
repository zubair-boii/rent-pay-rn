import {MagnifyingGlassIcon} from "phosphor-react-native";
import React, {useEffect, useState} from "react";
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
import {ThemeColors} from "../../constants/Colors";
import {useAuth} from "../../context/authContext";
import {collection, doc, onSnapshot, updateDoc} from "firebase/firestore";
import {firestore} from "../../config/firebase";

import FloatingAddButton from "../../components/FloatingAddButton";
import {useRouter} from "expo-router";
import {addToHistoryLog} from "../../utils/storage-utils";
import {Undo} from "../../utils/firebase-utils";

const HomeScreen = () => {
    const {user} = useAuth();
    const [tenants, setTenants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredTenants, setFilteredTenants] = useState([])
    const [searchQuery, setSearchQuery] = useState("")
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
            setFilteredTenants(tenantList);
            setLoading(false);
        });

        return () => unsubscribe(); // cleanup listener when component unmounts
    }, [user?.uid]);

    const showDate = () => {
        const date = new Date();
        const formattedDate = date.toLocaleDateString("en-GB");

        return formattedDate;
    };

    const handleCheck = async (shopNumber) => {
        try {
            setLoading(true);

            const tenantDocRef = doc(
                firestore,
                "users",
                user.uid,
                "tenants",
                shopNumber
            );

            // adding to local database (history)
            const selectedTenant = tenants.find((t) => t.id === shopNumber);
            if (selectedTenant) {
                await addToHistoryLog({...selectedTenant, hasPaid: true}, user);
            }

            await updateDoc(tenantDocRef, {
                hasPaid: true,
            });

            setLoading(false);
        } catch (error) {
            console.log("Error updating tenant payment status:", error);
        } finally {
            setLoading(false);
            // TODO: alert the user of success
        }
    };

    const handleUndo = async (shopNumber) => {
        try {

            await Undo(shopNumber, user);

            // 3. Update local state to reflect change
            setTenants((prevTenants) =>
                prevTenants.map((tenant) => {
                    if (tenant.id === shopNumber) {
                        return {...tenant, hasPaid: false};
                    }
                    return tenant;
                })
            );

            console.log("undo successful: ", tenants[0]);
        } catch (error) {
            console.log("Got an error while undoing the action:", error);
        }
    };

    const handleSearch = (text) => {
        const lowerCased = text.toLowerCase();

        const filteredTenants = tenants.filter((tenant) => tenant.name.toLowerCase().includes(lowerCased)
            || tenant.id.toLowerCase().includes(lowerCased))

        setFilteredTenants(filteredTenants);
    }

    return (
        <SafeAreaView className="bg-slate-900 flex-1 px-4 pt-16">
            {/* Header Card */}
            <View className="bg-slate-800 p-3 rounded-full mb-5 ">
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
                        placeholder="Search by name or shop no..."
                        SuffixIcon={MagnifyingGlassIcon}
                        paddingVertical={"3%"}
                        value={searchQuery}
                        onChangeText={(text) => {
                            setSearchQuery(text)
                            handleSearch(text)
                        }}
                    />
                </View>

                <View className="justify-center items-center">
                    <FloatingAddButton
                        style={{textColor: "#0f172a"}}
                        onPress={() => {
                            router.push("../(screens)/create");
                        }}
                    />
                </View>
            </View>

            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginVertical: 5,
                    alignItems: "center",
                }}
            >
                {/* Cards */}
                <Typo size={20} fontWeight="600" className="text-white mb-1">
                    Rents:
                </Typo>

                {/* date */}
                <Typo color={ThemeColors.tint}>{showDate()}</Typo>
            </View>

            {loading ? (

                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator color={ThemeColors.dimText} size="large"/>
                </View>

            ) : tenants.length === 0 ? (

                <Typo className="text-white text-center my-10">
                    ✅ No tenants found
                </Typo>

            ) : (
                <ScrollView>
                    {filteredTenants.map((tenant) => (
                        <TenantCard
                            key={tenant.id}
                            name={tenant.name}
                            dateJoined={tenant.dateJoined}
                            hasPaid={tenant.hasPaid}
                            phoneNumber={tenant.phoneNumber}
                            shopNumber={tenant.id}
                            amount={tenant.amount}
                            onCheck={() => handleCheck(tenant.id)}
                            onUndo={() => handleUndo(tenant.id)}
                        />
                    ))}
                </ScrollView>
            )}
        </SafeAreaView>
    );
};

export default HomeScreen;
