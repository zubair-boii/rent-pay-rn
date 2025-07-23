export const getProfileImage = (file) => {
  if (file && typeof file == "string") return file;
  if (file && typeof file == "object") return file.uri;

  return require("../assets/icons/default_profile.jpg");
};
