"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { formSchema } from "@/lib/constants";
import { useRouter, useParams } from "next/navigation";
import ImageUploader from "@/components/ui/core/ImageUploader";
import ImagePreviewer from "@/components/ui/core/ImagePreviewer";
import {
  useGetSingleListingQuery,
  useUpdateListingMutation,
} from "@/redux/apis/landlordslice";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [updateListing] = useUpdateListingMutation();


  const { data, isLoading, isError } = useGetSingleListingQuery(id);

  const form = useForm({
    defaultValues: {
      title: "",
      location: "",
      rent: "",
      bedrooms: "",
      bathrooms: "",
      area: "",
      description: "",
    },
  });

  useEffect(() => {
    if (data?.data) {
      form.reset(data.data);
    }
  }, [data, form]);

  const onSubmit = async (values: any) => {
    try {
      console.log("Submitted values:", values); // ✅ For debugging
      const formData = new FormData();
      const stringifiedValues = Object.fromEntries(
        Object.entries(values)
          .filter(([key]) => key !== "imageUrls")
          .map(([key, value]) => [key, String(value)])
      );

      formData.append("data", JSON.stringify(stringifiedValues));



      console.log('data from up',values);
      await updateListing({
        payload: {
          id, // make sure this is available in your component
          data: formData,
        },
      }).unwrap();
      router.push("/landlord/properties");
    } catch (error) {
      console.error("Failed to update listing:", error);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Property Update</CardTitle>
          <CardDescription>Update the details of your property.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Modern Apartment" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="123 Main St, City" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="rent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Monthly Rent ($)</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="1500"
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.valueAsNumber)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bedrooms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bedrooms</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="2"
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.valueAsNumber)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bathrooms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bathrooms</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="1.5"
                          step="0.5"
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.valueAsNumber)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="area"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Area (sq ft)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="1200"
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.valueAsNumber)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="md:col-span-2">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe the property..."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* <div className="md:col-span-2">
                  <FormLabel>Property Images</FormLabel>
                  <ImagePreviewer
                    setImageFiles={setImageFiles}
                    imagePreview={imagePreview}
                    setImagePreview={setImagePreview}
                  />
                  <ImageUploader
                    setImageFiles={setImageFiles}
                    setImagePreview={setImagePreview}
                  />
                </div> */}
              </div>

              <CardFooter className="flex justify-end gap-2 px-0">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
                <Button type="submit">Submit</Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
