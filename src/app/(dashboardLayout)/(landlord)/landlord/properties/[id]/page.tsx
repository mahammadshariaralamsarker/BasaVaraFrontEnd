"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import {
  Bed, Bath, SquareIcon as SquareFeet, MapPin, Pencil, Trash2, ArrowLeft,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { useDeleteListingMutation,  useGetSingleListingQuery } from "@/redux/apis/landlord.slice"

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

  const { data, isLoading } = useGetSingleListingQuery(params.id)
  const property = data?.data ?? {}
  const [deleteProperty, { isLoading: isDeleting }] = useDeleteListingMutation()

//  console.log(property);
  const handleDelete = async () => {
    try {
      await deleteProperty(params.id).unwrap()
      toast({ title: "Property deleted", description: "The property has been successfully deleted." })
      router.push("/landlord/properties")
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete property.", variant: "destructive" })
    } finally {
      setIsDeleteDialogOpen(false)
    }
  }

  if (isLoading || !property) {
    return <p>Loading...</p>
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">{property.title}</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.push(`/landlord/properties/${params.id}/edit`)}>
            <Pencil className="h-4 w-4" /> Edit
          </Button>
          <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="h-4 w-4" /> Delete
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogDescription>This will permanently delete this property and all its data.</DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
                <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                  {isDeleting ? "Deleting..." : "Delete Property"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Images and Tabs */}
        <div className="md:col-span-2">
          <Card className="overflow-hidden">
            <div className="relative aspect-video">
              <Image
                src={property.imageUrls?.[activeImage] || "/placeholder.svg"}
                alt={property.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex p-2 gap-2 overflow-x-auto">
              {property.imageUrls?.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`relative h-16 w-24 overflow-hidden rounded-md border-2 ${
                    activeImage === index ? "border-teal-600" : "border-transparent"
                  }`}
                >
                  <Image src={image} alt={`Image ${index + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          </Card>

          <Tabs defaultValue="details" className="mt-6">
            <TabsList>
              <TabsTrigger value="details">Details</TabsTrigger>
              {/* <TabsTrigger value="amenities">Amenities</TabsTrigger> */}
              <TabsTrigger value="location">Location</TabsTrigger>
            </TabsList>

            {/* Details Tab */}
            <TabsContent value="details" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Property Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{property.description}</p>
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    <DetailItem label="Status">
                      <Badge className={
                        property.houseStatus === "available" ? "bg-green-500" :
                          // property.houseStatus === "pending" ? "bg-yellow-500" :
                            "bg-blue-500"
                      }>
                        {property.houseStatus}
                      </Badge>
                    </DetailItem>
                    {/* <DetailItem label="Listed On">{property.createdAt}</DetailItem> */}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Amenities Tab */}
            {/* <TabsContent value="amenities" className="mt-4">
              <Card>
                <CardHeader><CardTitle>Amenities</CardTitle></CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                    {property.amenities?.map((amenity: string) => (
                      <div key={amenity} className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-100 text-teal-600">
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
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
            </TabsContent> */}

            {/* Location Tab */}
            <TabsContent value="location" className="mt-4">
              <Card>
                <CardHeader><CardTitle>Location</CardTitle></CardHeader>
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

        {/* Property Summary */}
        <div>
          <Card>
            <CardHeader><CardTitle>Property Summary</CardTitle></CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div>
                  <p className="text-2xl font-bold">${property.rent}/month</p>
                  <p className="text-sm text-muted-foreground">Plus utilities</p>
                </div>
                <div className="flex justify-between border-t pt-4">
                  <SummaryItem icon={<Bed />} label={`${property.bedrooms} Beds`} />
                  <SummaryItem icon={<Bath />} label={`${property.bathrooms} Baths`} />
                  <SummaryItem icon={<SquareFeet />} label={`${property.area} sqft`} />
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

function DetailItem({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-sm font-medium">{children}</span>
    </div>
  )
}

function SummaryItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      {icon}
      <span>{label}</span>
    </div>
  )
}
