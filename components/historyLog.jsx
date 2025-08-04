import {View} from "react-native";
import React from "react";
import Typo from "./Typo";
import {
    MoneyIcon,
    UserCheckIcon,
    StorefrontIcon, CheckCircleIcon,
} from "phosphor-react-native";
import {ThemeColors} from "../constants/Colors";
import {useAuth} from "../context/authContext";

function showDate() {
    const date = new Date();
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

const HistoryLog = ({
                        name,
                        amount,
                        shopNumber,
                    }) => {


    const InforRow = ({icon, label, value}) => {
        return (
            <View className="justify-between items-center flex-row ">
                <View className="justify-between items-center flex-row gap-2">
                    {icon}
                    <Typo>{label}</Typo>
                </View>
                <Typo>{value}</Typo>
            </View>
        );
    };

    return (
        <View>
            <View className="bg-slate-800 rounded-2xl px-5 py-3 w-full m-2">
                <View className="py-2 flex-row justify-between">
                    <Typo color={ThemeColors.tint}>Paid on: {showDate()}</Typo>
                    <CheckCircleIcon size={20} color={"green"} weight={"fill"}/>
                </View>

                <InforRow
                    icon={<UserCheckIcon size={15} color={ThemeColors.tint}/>}
                    label="Name"
                    value={name}
                />

                <InforRow
                    icon={<MoneyIcon size={15} color={ThemeColors.tint}/>}
                    label="Amount"
                    value={amount}
                />
                <InforRow
                    icon={<StorefrontIcon size={15} color={ThemeColors.tint}/>}
                    label="Shop"
                    value={shopNumber}
                />
            </View>
        </View>
    );
};

export default HistoryLog;
