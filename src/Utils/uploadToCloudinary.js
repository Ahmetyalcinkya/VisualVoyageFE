import axios from "axios";

const cloud_name = "dtr8pfyna";
const upload_preset = "VisualVoyage";

export const uploadToCloudinary = async (pics, fileType) => {
  if (pics && fileType) {
    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", upload_preset);
    data.append("cloud_name", cloud_name);

    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloud_name}/${fileType}/upload`,
      data
    );
    console.log("Cloudinary response : ", res);

    const fileData = await res.json;
    console.log("Cloudinary url : ", fileData.url);
    return fileData.url;
  } else {
    console.log("Cloudinary error...");
  }
};
