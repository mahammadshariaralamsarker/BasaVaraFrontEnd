"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, Upload } from "lucide-react"

const formSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }),
  location: z.string().min(3, {
    message: "Location must be at least 3 characters.",
  }),
  rent: z.coerce.number().positive({
    message: "rent must be a positive number.",
  }),
  bedrooms: z.coerce.number().int().positive({
    message: "Bedrooms must be a positive integer.",
  }),
  bathrooms: z.coerce.number().positive({
    message: "Bathrooms must be a positive number.",
  }),
  area: z.coerce.number().positive({
    message: "Area must be a positive number.",
  }),
  houseStatus: z.enum(["Available", "Rented", "Pending"]),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  amenities: z.array(z.string()).optional(),
})

const amenitiesList = [
  { id: "parking", label: "Parking" },
  { id: "pool", label: "Swimming Pool" },
  { id: "gym", label: "Gym" },
  { id: "security", label: "Security System" },
  { id: "ac", label: "Air Conditioning" },
  { id: "heating", label: "Heating" },
  { id: "laundry", label: "Laundry" },
  { id: "pets", label: "Pet Friendly" },
]

// Mock property data for editing
const mockProperty = {
  id: "1",
  title: "Modern Downtown Apartment",
  location: "123 Main St, New York, NY 10001",
  rent: 2500,
  bedrooms: 2,
  bathrooms: 2,
  area: 1200,
  houseStatus: "Available",
  description:
    "A beautiful modern apartment in the heart of downtown. This recently renovated unit features hardwood floors, stainless steel appliances, and a spacious living area. The building includes a fitness center, rooftop terrace, and 24-hour doorman.",
  amenities: ["parking", "gym", "ac", "security", "laundry"],
}

export default function EditPropertyPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      location: "",
      rent: undefined,
      bedrooms: undefined,
      bathrooms: undefined,
      area: undefined,
      houseStatus: "Available",
      description: "",
      amenities: [],
    },
  })

  // Simulate fetching property data
  useEffect(() => {
    // In a real app, you would fetch the property data from an API
    // For now, we'll use the mock data
    setTimeout(() => {
      form.reset({
        title: mockProperty.title,
        location: mockProperty.location,
        rent: mockProperty.rent,
        bedrooms: mockProperty.bedrooms,
        bathrooms: mockProperty.bathrooms,
        area: mockProperty.area,
        houseStatus: mockProperty.houseStatus as "Available" | "Rented" | "Pending",
        description: mockProperty.description,
        amenities: mockProperty.amenities,
      })
      setIsLoading(false)
    }, 500)
  }, [form, params.id])

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      console.log(values)
      setIsSubmitting(false)

      toast({
        title: "Property updated",
        description: "Your property has been successfully updated.",
      })

      router.push(`/landlord/properties/${params.id}`)
    }, 1500)
  }
  



  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Edit Property</h1>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="h-8 w-8">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Edit Property</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Property Details</CardTitle>
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
                        <Input type="number" placeholder="1500" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                          <SelectItem value="Available">Available</SelectItem>
                          <SelectItem value="Rented">Rented</SelectItem>
                          <SelectItem value="Pending">Pending</SelectItem>
                        </SelectContent>
                      </Select>
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
                        <Input type="number" placeholder="2" {...field} />
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
                        <Input type="number" placeholder="1.5" {...field} />
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
                        <Input type="number" placeholder="1200" {...field} />
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
                          <Textarea placeholder="Describe the property..." className="min-h-[120px]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* <div className="md:col-span-2">
                  <FormField
                    control={form.control}
                    name="amenities"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel>Amenities</FormLabel>
                          <FormDescription>Select all amenities that apply to this property.</FormDescription>
                        </div>
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                          {amenitiesList.map((amenity) => (
                            <FormField
                              key={amenity.id}
                              control={form.control}
                              name="amenities"
                              render={({ field }) => {
                                return (
                                  <FormItem key={amenity.id} className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(amenity.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...(field.value || []), amenity.id])
                                            : field.onChange(field.value?.filter((value) => value !== amenity.id))
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">{amenity.label}</FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div> */}
                {/* <div className="md:col-span-2">
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
              </div>

              <CardFooter className="flex justify-end gap-2 px-0">
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-teal-600 hover:bg-teal-700" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
