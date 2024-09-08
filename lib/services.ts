import axios from "axios";
import { API_URL } from "@/lib/constants";

export async function uploadImage(file: File) {
  try {
    const { data } = await axios.post(
      `${API_URL}/uploadImage`,
      {
        image: file,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return data;
  } catch (err) {
    throw new Error("error while uploading image");
  }
}

export async function submitMealForm(formData: any) {
  try {
    const { data } = await axios.post(`${API_URL}/menu-request`, formData);
    console.log(data);
    return data;
  } catch (err) {
    throw new Error("error while submitting menu");
  }
}
