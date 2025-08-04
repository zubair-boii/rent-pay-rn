import React, {useCallback, useState} from "react";
import {ScrollView, TouchableOpacity, View, Alert, ActivityIndicator} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

import {ThemeColors} from "../../constants/Colors";
import Typo from "../../components/Typo";
import {useAuth} from "../../context/authContext";
import InputField from "../../components/Input";
import {MagnifyingGlassIcon, TrashIcon} from "phosphor-react-native";
import HistoryLog from "../../components/historyLog";
import {useFocusEffect} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {handleDeleteCurrTenantLog, loadLogs} from "../../utils/storage-utils";

export default function HistoryScreen() {
    const {user} = useAuth();
    const [tenants, setTenants] = useState([]);
    const [loading, setLoading] = useState(false);

    useFocusEffect(
        useCallback(() => {
            let isActive = true;

            const fetchData = async () => {
                setLoading(true);
                await loadLogs(user, (data) => {
                    if (isActive) {
                        setTenants(data);
                    }
                });
                if (isActive) {
                    setLoading(false);
                }
            };

            fetchData();

            return () => {
                isActive = false;
            };
        }, [user])
    );

    const AlertDeleteCurrTenantLog = async () => {
        Alert.alert("Delete Logs", "Are you sure you want to perform this operation?", [
            {
                text: "Cancel",
                style: "cancel",
                onPress: () => {
                }
            },
            {
                text: "Confirm",
                style: "destructive",
                onPress: () => handleDeleteCurrTenantLog(user, setTenants)
            },

        ], {cancelable: true})
    }

    // const handleSearch = (text) => {
    //     const lowerCased = text.toLowerCase();
    //
    //     const filteredTenants = tenants.filter((tenant) => tenant.name.toLowerCase().includes(lowerCased)
    //         || tenant.id.toLowerCase().includes(lowerCased))
    //
    //     setFilteredTenants(filteredTenants);
    // }
    return (
        <SafeAreaView
            style={{
                backgroundColor: ThemeColors.background[200],
                flex: 1,
                alignItems: "center",
            }}
        >

            {loading ? (
                    <View className="flex-1 justify-center items-center">
                        <ActivityIndicator color={ThemeColors.dimText} size="large"/>
                    </View>
                ) :
                tenants.length === 0 ?
                    <View className={"justify-center items-center flex-1"}>
                        <Typo color={ThemeColors.dimText} size={18}> No history Found </Typo>
                    </View> : (
                        <View className="mt-5 w-full">
                            <>
                                <View className="items-center justify-center p-3">
                                    <Typo size={20} fontWeight="600" color={ThemeColors.dimText}>
                                        History
                                    </Typo>
                                    <View className="absolute right-5">
                                        <TouchableOpacity onPress={AlertDeleteCurrTenantLog}>
                                            <TrashIcon size={24} color="red"/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View className="w-full px-5">
                                    <InputField
                                        borderRadius={40}
                                        containerStyle={{
                                            innerWidth: "100%",
                                            width: "100%",
                                            outerWidth: "100%",
                                        }}
                                        onChangeText={(text) => {
                                            console.log("hello");
                                        }}
                                        placeholder="Search"
                                        SuffixIcon={MagnifyingGlassIcon}
                                        paddingVertical={"3%"}
                                    />
                                </View>
                                <ScrollView className="w-full px-5 py-4">
                                    {tenants.map((tenant, index) => (
                                        <HistoryLog
                                            key={index}
                                            name={tenant.name}
                                            shopNumber={tenant.shopNumber}
                                            amount={tenant.amount}
                                        />
                                    ))}
                                </ScrollView>
                            </>
                        </View>
                    )
            }
        </SafeAreaView>
    );
}
