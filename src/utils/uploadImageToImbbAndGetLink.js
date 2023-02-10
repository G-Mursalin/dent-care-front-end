import { toast } from "react-hot-toast";

// Send image to ImgBB and Get the Image URL
const uploadImageToImbbAndGetLink = async (photo) => {
  try {
    const formData = new FormData();
    formData.append("image", photo);
    const response = await fetch(
      `https://api.imgbb.com/1/upload?expiration=600&key=${process.env.REACT_APP_Imbb_API_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
    if (data.success) {
      return data.data.url;
    } else {
      throw new Error("Image Can't Upload");
    }
  } catch (error) {
    toast.error(error.message);
    return "https://i.postimg.cc/650DX1CX/image-holder.webp";
  }
};

export default uploadImageToImbbAndGetLink;
