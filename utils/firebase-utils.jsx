// import AsyncStorage from "@react-native-async-storage/async-storage";
import {doc, updateDoc} from "firebase/firestore";
import {firestore} from "../config/firebase";

export const Undo = async (shopNumber, user) => {
    try {
        // 1. Set hasPaid to false in Firestore
        const tenantRef = doc(firestore, "users", user.uid, "tenants", shopNumber);
        await updateDoc(tenantRef, {hasPaid: false});

        // // 2. Update local AsyncStorage: remove the tenant from history
        // const existing = await AsyncStorage.getItem(`history-${user.uid}`);
        // let parsed = existing ? JSON.parse(existing) : [];
        //
        // // Remove the item with matching shopNumber
        // const updated = parsed.filter((tenant) => tenant.id !== shopNumber);
        //
        // await AsyncStorage.setItem(`history-${user.uid}`, JSON.stringify(updated));

        return {success: true, msg: "Undo successful"};
    } catch (error) {
        console.log("Got an error while undoing the action:", error);
        return {success: false, msg: error.message};
    }
};
