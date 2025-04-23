"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, Bed, Bath, SquareIcon as SquareFeet, MapPin, Pencil, Trash2 } from "lucide-react"

// Mock property data
const property = {
  id: "1",
  title: "Modern Downtown Apartment",
  location: "123 Main St, New York, NY 10001",
  price: 2500,
  bedrooms: 2,
  bathrooms: 2,
  area: 1200,
  status: "Available",
  description:
    "A beautiful modern apartment in the heart of downtown. This recently renovated unit features hardwood floors, stainless steel appliances, and a spacious living area. The building includes a fitness center, rooftop terrace, and 24-hour doorman.",
  amenities: ["parking", "gym", "ac", "security", "laundry"],
  images: [
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
  ],
  createdAt: "2023-09-15",
}

const amenitiesLabels: Record<string, string> = {
  parking: "Parking",
  pool: "Swimming Pool",
  gym: "Gym",
  security: "Security System",
  ac: "Air Conditioning",
  heating: "Heating",
  laundry: "Laundry",
  pets: "Pet Friendly",
}

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [activeImage, setActiveImage] = useState(0)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = () => {
    setIsDeleting(true)

    // Simulate API call
    setTimeout(() => {
      setIsDeleting(false)
      setIsDeleteDialogOpen(false)

      toast({
        title: "Property deleted",
        description: "The property has been successfully deleted.",
      })

      router.push("/landlord/properties")
    }, 1500)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">{property.title}</h1>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex gap-2"
            onClick={() => router.push(`/landlord/properties/${params.id}/edit`)}
          >
            <Pencil className="h-4 w-4" />
            Edit
          </Button>
          <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive" className="flex gap-2">
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you sure you want to delete this property?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete the property and all associated data.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                  {isDeleting ? "Deleting..." : "Delete Property"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card className="overflow-hidden">
            <div className="relative aspect-video">
              <Image
                src={property.images[activeImage] || "/placeholder.svg"}
                alt={property.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex p-2 gap-2 overflow-x-auto">
              {property.images.map((image, index) => (
                <button
                  key={index}
                  className={`relative h-16 w-24 overflow-hidden rounded-md border-2 ${
                    activeImage === index ? "border-teal-600" : "border-transparent"
                  }`}
                  onClick={() => setActiveImage(index)}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${property.title} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </Card>

          <Tabs defaultValue="details" className="mt-6">
            <TabsList>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="amenities">Amenities</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Property Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{property.description}</p>
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-muted-foreground">Status</span>
                      <Badge
                        className={
                          property.status === "Available"
                            ? "bg-green-500 hover:bg-green-600"
                            : property.status === "Pending"
                              ? "bg-yellow-500 hover:bg-yellow-600"
                              : "bg-blue-500 hover:bg-blue-600"
                        }
                      >
                        {property.status}
                      </Badge>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-muted-foreground">Listed On</span>
                      <span className="text-sm font-medium">{property.createdAt}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="amenities" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Amenities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                    {property.amenities.map((amenity) => (
                      <div key={amenity} className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-100 text-teal-600">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                          >
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                            <polyline points="22 4 12 14.01 9 11.01" />
                          </svg>
                        </div>
                        <span className="text-sm">{amenitiesLabels[amenity] || amenity}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="location" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Location</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{property.location}</span>
                  </div>
                  <div className="aspect-video rounded-md bg-muted flex items-center justify-center">
                    <p className="text-muted-foreground">Map would be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Property Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div>
                  <p className="text-2xl font-bold">${property.price}/month</p>
                  <p className="text-sm text-muted-foreground">Plus utilities</p>
                </div>
                <div className="flex justify-between border-t pt-4">
                  <div className="flex items-center gap-2">
                    <Bed className="h-4 w-4 text-muted-foreground" />
                    <span>{property.bedrooms} Beds</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bath className="h-4 w-4 text-muted-foreground" />
                    <span>{property.bathrooms} Baths</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <SquareFeet className="h-4 w-4 text-muted-foreground" />
                    <span>{property.area} sqft</span>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <h3 className="font-medium mb-2">Contact Information</h3>
                  <p className="text-sm">John Doe (Property Manager)</p>
                  <p className="text-sm">john.doe@example.com</p>
                  <p className="text-sm">(123) 456-7890</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
