"use client";

import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Badge } from "@/components/ui/badge";
import { z } from "zod";
import { formSchema } from "@/schema/schema";
import { submitMealForm } from "@/lib/services";

const MyForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mealType: "",
      cuisinePreferences: [],
      // headcount: "0",
      // dietaryRestrictionsAndAllergies: "",
      // perPerson: 0,
      // total: 0,
      servingStyle: "",
      additionalInformation: "",
      carouselOfRecommendedMenus: [],
    },
  });

  function handleTags(
    event: React.KeyboardEvent<HTMLInputElement>,
    field: ControllerRenderProps<
      z.infer<typeof formSchema>,
      "cuisinePreferences" | "carouselOfRecommendedMenus"
    >,
  ) {
    if (event.key === "Enter") {
      event.preventDefault();

      const tagInput = event.target as HTMLInputElement;
      const tagValue = tagInput.value.trim();

      if (field.name === "cuisinePreferences") {
        if (tagValue === "") {
          return form.setError("cuisinePreferences", {
            type: "required",
            message: "Tag must not be empty.",
          });
        }

        if (!field.value.includes(tagValue)) {
          form.setValue("cuisinePreferences", [...field.value, tagValue]);
          tagInput.value = "";
          form.clearErrors("cuisinePreferences");
        }
      } else if (field.name === "carouselOfRecommendedMenus") {
        if (tagValue === "") {
          return form.setError("carouselOfRecommendedMenus", {
            type: "required",
            message: "Tag must not be empty.",
          });
        }

        if (!field.value.includes(tagValue)) {
          form.setValue("carouselOfRecommendedMenus", [
            ...field.value,
            tagValue,
          ]);
          tagInput.value = "";
          form.clearErrors("carouselOfRecommendedMenus");
        }
      }
    }
  }

  async function onSubmit(formData: z.infer<typeof formSchema>) {
    const data = {
      customerId: "668703c10f1735f5eb5ad85e",
      tentativeDateTime: new Date(Date.now()),
      mealType: formData.mealType,
      cuisinePreferences: formData.cuisinePreferences,
      headcount: 50,
      dietaryRestrictionsAndAllergies: "No nuts, vegan options required",
      perPerson: 15,
      total: 750,
      servingStyle: formData.servingStyle,
      additionalInformation: formData.additionalInformation,
      carouselOfRecommendedMenus: formData.carouselOfRecommendedMenus,
    };

    setIsSubmitting(true);

    submitMealForm(data)
      .then((data) => {
        if (data) {
          console.log(data);
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  if (isSubmitting) return <div>Loading...</div>;

  return (
    <div className={"w-[500px] p-10"}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-full gap-4"
        >
          {/*Meal Type*/}
          <FormField
            control={form.control}
            name="mealType"
            render={({ field }) => (
              <FormItem className={"flex flex-col w-full"}>
                <FormLabel
                  className={"paragraph-semibold text-dark400_light800"}
                >
                  Meal Type
                  <span className={"text-primary-500"}>*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter here..."
                    {...field}
                    className={
                      "no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                    }
                  />
                </FormControl>
                <FormMessage className={"text-red-500"} />
              </FormItem>
            )}
          />

          {/* cuisinePreferences Field */}
          <FormField
            control={form.control}
            name={"cuisinePreferences"}
            render={({ field }) => (
              <FormItem className={"flex w-full flex-col"}>
                <FormLabel
                  className={"paragraph-semibold text-dark400_light800"}
                >
                  Cuisine Preferences
                  <span className={"text-primary-500"}>*</span>
                </FormLabel>
                <FormControl className={"mt-3.5"}>
                  <Input
                    className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                    placeholder={"Add Cuisine Preferences"}
                    onKeyDown={(event) => handleTags(event, field)}
                  />
                </FormControl>

                {field.value.length > 0 && (
                  <div className={"flex flex-start mt-2.5 gap-2"}>
                    {field.value.map((tag) => (
                      <Badge
                        key={tag}
                        className="subtle-medium background-light800_dark300 text0light400_light500 flex items-center justify-center gap-2 rounded-md border-none px-4 py-2 uppercase w-fit"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
                <FormMessage className={"text-red-500"} />
              </FormItem>
            )}
          />

          {/* serving style */}
          <FormField
            control={form.control}
            name="servingStyle"
            render={({ field }) => (
              <FormItem className={"flex flex-col w-full"}>
                <FormLabel
                  className={"paragraph-semibold text-dark400_light800"}
                >
                  Serving Style
                  <span className={"text-primary-500"}>*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Serving Style"
                    {...field}
                    className={
                      "no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                    }
                  />
                </FormControl>
                <FormMessage className={"text-red-500"} />
              </FormItem>
            )}
          />

          {/* Additional Information */}
          <FormField
            control={form.control}
            name="additionalInformation"
            render={({ field }) => (
              <FormItem className={"flex flex-col w-full"}>
                <FormLabel
                  className={"paragraph-semibold text-dark400_light800"}
                >
                  Additional Information
                  <span className={"text-primary-500"}>*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Serving Style"
                    {...field}
                    className={
                      "no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                    }
                  />
                </FormControl>
                <FormMessage className={"text-red-500"} />
              </FormItem>
            )}
          />

          {/* carouselOfRecommendedMenus Field */}
          <FormField
            control={form.control}
            name={"carouselOfRecommendedMenus"}
            render={({ field }) => (
              <FormItem className={"flex w-full flex-col"}>
                <FormLabel
                  className={"paragraph-semibold text-dark400_light800"}
                >
                  Carousel Of Recommended Menus
                  <span className={"text-primary-500"}>*</span>
                </FormLabel>
                <FormControl className={"mt-3.5"}>
                  <Input
                    className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                    placeholder={"Carousel Of Recommended Menus"}
                    onKeyDown={(event) => handleTags(event, field)}
                  />
                </FormControl>

                {field.value.length > 0 && (
                  <div className={"flex flex-start mt-2.5 gap-2"}>
                    {field.value.map((tag) => (
                      <Badge
                        key={tag}
                        className="subtle-medium background-light800_dark300 text0light400_light500 flex items-center justify-center gap-2 rounded-md border-none px-4 py-2 uppercase w-fit"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
                <FormMessage className={"text-red-500"} />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className={"primary-gradient w-fit !text-light-900"}
            disabled={isSubmitting}
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};
export default MyForm;
