import AsyncStorage from "@react-native-async-storage/async-storage";

export const addToHistoryLog = async (tenant, user) => {

    try {
        const existingLog = await AsyncStorage.getItem(`history-${user.uid}`);
        const historyLog = existingLog ? JSON.parse(existingLog) : [];

        const updatedHistoryLog = [tenant, ...historyLog];

        await AsyncStorage.setItem(`history-${user.uid}`, JSON.stringify(updatedHistoryLog));
    } catch (err) {
        console.error("Error saving to history:", err);
    }
};


export const loadLogs = async (user, setTenants) => {
    try {
        if (!user?.uid) {
            console.warn("No user provided for deleting tenant log.");
            return;
        }
        const data = await AsyncStorage.getItem(`history-${user.uid}`);

        if (data) {
            setTenants(JSON.parse(data));
        } else {
            setTenants([]);
        }

    } catch (err) {
        console.log("Error reading history:", err);
    }

};


export const handleDeleteCurrTenantLog = async (user, setTenants, customKey) => {
    try {
        if (!user?.uid) {
            console.warn("No user provided for deleting tenant log.");
            return;
        }

        const key = customKey || `history-${user.uid}`;
        await AsyncStorage.removeItem(key);
        setTenants([]);
        console.log(`Deleted local history for user ${user.uid}`);
    } catch (error) {
        console.error("Error deleting tenant history:", error);
    }
}

