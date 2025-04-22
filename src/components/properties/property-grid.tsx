"use client"

import {  useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bed, Bath, SquareIcon as SquareFeet } from "lucide-react"

import { useGetAllListingsQuery } from "@/redux/apis/landlord.slice"



interface PropertyGridProps {
  searchQuery?: string
  filters?: {
    status: string
    minPrice: number
    maxPrice: number
    bedrooms: string
    bathrooms: string
  }
}

export default function PropertyGrid({
  searchQuery = "",
  filters = { status: "", minPrice: 0, maxPrice: 5000, bedrooms: "", bathrooms: "" },
}: PropertyGridProps) {
  const { data, isLoading, error } = useGetAllListingsQuery();
   const properties = useMemo(() => (data ? data.data : []), [data]);
   console.log(properties);

  // console.log("Properties:", properties);
  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      // Convert fields
      const rent = parseFloat(property.rent)
      const bedrooms = parseInt(property.bedrooms)
      const bathrooms = parseFloat(property.bathrooms)
      const status = property.houseStatus || "available"

      // Search filter
      if (
        searchQuery &&
        !property.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !property.location.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false
      }

      // Status filter
      if (filters.status && status !== filters.status.toLowerCase()) {
        if (filters.status.toLowerCase() === 'any') return true;
        return false
      }

      // Price range filter
      if (rent < filters.minPrice || rent > filters.maxPrice) {
        return false
      }

      // Bedrooms filter
      if (filters.bedrooms && bedrooms < parseInt(filters.bedrooms)) {
        return false
      }

      // Bathrooms filter
      if (filters.bathrooms && bathrooms < parseInt(filters.bathrooms)) {
        return false
      }

      return true
    })
  }, [properties, searchQuery, filters])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-lg text-muted-foreground">Loading properties...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    )
  }

  if (filteredProperties.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-lg text-muted-foreground">No properties found matching your criteria.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {filteredProperties.map((property) => (
        <Card key={property._id} className="overflow-hidden">
          <div className="relative aspect-video">
            <Badge
              className={`absolute right-2 top-2 z-10 ${
                property.houseStatus === "available"
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {property.houseStatus ?? "available"}
            </Badge>
            <Image
              src={property.imageUrls?.[0] || "/placeholder.svg"}
              alt={property.title}
              fill
              className="object-cover"
            />
          </div>
          <CardContent className="p-4">
            <h3 className="font-semibold">{property.title}</h3>
            <p className="text-sm text-muted-foreground">{property.location}</p>
            <div className="mt-4 flex justify-between">
              <div className="flex items-center gap-1">
                <Bed className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{property.bedrooms}</span>
              </div>
              <div className="flex items-center gap-1">
                <Bath className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{property.bathrooms}</span>
              </div>
              <div className="flex items-center gap-1">
                <SquareFeet className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{property.area} sqft</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t p-4">
            <p className="font-bold">${property.rent}/month</p>
            <Link
              href={`/landlord/properties/${property._id}`}
              className="text-sm font-medium text-teal-600 hover:underline"
            >
              View Details
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
