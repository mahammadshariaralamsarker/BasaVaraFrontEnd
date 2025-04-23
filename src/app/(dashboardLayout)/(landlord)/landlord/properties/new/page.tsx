"use client"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Upload, ArrowLeft } from "lucide-react"
import { useCreateListingMutation } from "@/redux/apis/landlord.slice"
import { ImageUploader } from "@/components/shared/ImageUploader"
import { useEffect, useState } from "react"



export default function NewPropertyPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [createListing, { isLoading }] = useCreateListingMutation();
  const [images, setImages] = useState<File[]>([]);

  const form = useForm({
    defaultValues: {
      title: "",
      location: "",
      rent: 0,
      bedrooms: 0,
      bathrooms: 0,
      area: 0,
      houseStatus: "available",
      description: "",
    },
  })

  type FormValues = {
    title: string;
    location: string;
    rent: number;
    bedrooms: number;
    bathrooms: number;
    area: number;
    houseStatus: string;
    description: string;
  };

  // const onSubmit = async (values: FormValues) => {
  //   try {
  //     await createListing({ data: values }).unwrap()

  //     toast({
  //       title: "Success!",
  //       description: "Property has been created.",
  //     })

  //     router.push("/landlord/properties")
  //   } catch (err) {
  //     toast({
  //       title: "Error!",
  //       description: "Failed to create property. Please try again.",
  //       variant: "destructive",
  //     })
  //   }
  // }


  
  async function onSubmit(values) {

    console.log(values)
      console.log(images);;
    try {
      const res = await fetch("http://localhost:5000/landlords/listings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: values, // ✅ wrap values in a `data` key
        }),
      })
  
      const data = await res.json()
  
      if (!res.ok) {
        throw new Error(data.message || "Something went wrong!")
      }
  
      toast({
        title: "Property created",
        description: "Your property has been successfully created.",
      })
  
      router.push("/landlord/properties")
    } catch (error) {
      console.error("Error:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to create property",
        variant: "destructive",
      })
    } finally {

    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="h-8 w-8">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Add New Property</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Property Details</CardTitle>
          <CardDescription>Enter the details of your new property.</CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-6 md:grid-cols-2">
                {/** Title */}
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

                {/** Location */}
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

                {/** Rent */}
                <FormField
                  control={form.control}
                  name="rent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Monthly Rent ($)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/** House Status */}
                <FormField
                  control={form.control}
                  name="houseStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="available">Available</SelectItem>
                          <SelectItem value="rented">Rented</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/** Bedrooms */}
                <FormField
                  control={form.control}
                  name="bedrooms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bedrooms</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/** Bathrooms */}
                <FormField
                  control={form.control}
                  name="bathrooms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bathrooms</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/** Area */}
                <FormField
                  control={form.control}
                  name="area"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Area (sq ft)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/** Description */}
                <div className="md:col-span-2">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Describe the property..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* * Image Upload Placeholder
                <div className="md:col-span-2">
                  <FormLabel>Property Images</FormLabel>
                  <FormDescription className="mb-4">
                    Upload images of your property. You can upload multiple images.
                  </FormDescription>
                  <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-12">
                    <div className="flex flex-col items-center">
                      <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm font-medium mb-1">Drag and drop your images here</p>
                      <p className="text-xs text-muted-foreground mb-4">PNG, JPG, WEBP up to 10MB</p>
                      <Button type="button" variant="outline" size="sm">
                        Browse Files
                      </Button>
                    </div>
                  </div>
                </div> */}

<ImageUploader onFilesChange={(files) => setImages(files)} />
              </div>

              <CardFooter className="flex justify-end gap-2 px-0">
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-teal-600 hover:bg-teal-700" disabled={isLoading}>
                  {isLoading ? "Creating..." : "Create Property"}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
