import { z } from "zod";

export const formSchema = z.object({
  mealType: z.string(),
  cuisinePreferences: z.array(z.string()).min(1).max(5),
  // headcount: z.string(),
  // dietaryRestrictionsAndAllergies: z.string(),
  // perPerson: z.number(),
  // total: z.number(),
  servingStyle: z.string(),
  additionalInformation: z.string(),
  carouselOfRecommendedMenus: z.array(z.string()).min(1).max(5),
});
