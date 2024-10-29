// hooks/useImageUpload.js
import { useState } from "react";
import axios from "axios";

export const useImageUpload = () => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const uploadImage = async () => {
    if (!image) return null;

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "farmdev");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/pro-solve/image/upload",
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      console.error("Image upload error", error);
    }
  };

  return { handleImageChange, uploadImage, imagePreview };
};
