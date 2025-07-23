import axios from "axios";

const CLOUDINARY_API_URL = `https://api.cloudinary.com/v1_1/${process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;

export const uploadFileToCloudinary = async (file, folderName) => {
  try {
    if (typeof file == "string") {
      return { success: true, data: file };
    }

    if (file && file.uri) {
      const formData = new FormData();
      formData.append("file", {
        uri: file?.uri,
        type: "image/jpeg",
        name: file?.uri?.split("/").pop() || "file.jpg",
      });
      formData.append(
        "upload_preset",
        process.env.EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET
      );
      formData.append("folder", folderName);

      const response = await axios.post(CLOUDINARY_API_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const data = response.data;

      return { success: true, data: data.secure_url };
    }

    return { success: true };
  } catch (error) {
    console.log("got an error uploading file to cloud: ", error);
    return {
      success: false,
      msg: error.message || "Could not upload the file",
    };
  }
};

export const getProfileImage = (file) => {
  if (file && typeof file == "string") return file;
  if (file && typeof file == "object") return file.uri;

  return require("../assets/icons/default_profile.jpg");
};
