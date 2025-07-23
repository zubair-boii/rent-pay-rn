import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../config/firebase";
import { uploadFileToCloudinary } from "./image_service";

export const updateUser = async (uid, updatedData) => {
  try {
    if (updatedData.image && updatedData?.image?.uri) {
      console.log("ENTERED IMAGE FUNCTION");
      const imageUploadRes = await uploadFileToCloudinary(
        updatedData.image,
        "users"
      );

      if (!imageUploadRes.success) {
        return {
          success: false,
          msg: imageUploadRes.msg || "Failed to upload message",
        };
      }
      updatedData.image = imageUploadRes.data;
    }

    const userRef = doc(firestore, "users", uid);
    await updateDoc(userRef, updatedData);

    return { success: true, msg: "updated successfully." };
  } catch (error) {
    console.log("Error updating user:", error);
    return { success: false, msg: error.message };
  }
};
