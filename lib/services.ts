import axios from "axios";
import { API_URL } from "@/lib/constants";
import { ZodString } from "zod";

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

interface FormType {
  additionalInformation: string;
  total: number;
  headcount: number;
  tentativeDateTime: Date;
  cuisinePreferences: ZodString["_output"][];
  perPerson: number;
  customerId: string;
  mealType: string;
  dietaryRestrictionsAndAllergies: string;
  carouselOfRecommendedMenus: ZodString["_output"][];
  servingStyle: string;
}

export async function submitMealForm(formData: FormType) {
  try {
    const { data } = await axios.post(`${API_URL}/menu-request`, formData);
    return data;
  } catch (err) {
    throw new Error("error while submitting menu");
  }
}
