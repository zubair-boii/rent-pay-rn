import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../config/firebase";

export const updateUser = async (uid, updatedData) => {
  try {
    const userRef = doc(firestore, "users", uid);
    await updateDoc(userRef, updatedData);

    return { success: true, msg: "updated successfully." };
  } catch (error) {
    console.log("Error updating user:", error);
    return { success: false, msg: error.message };
  }
};
