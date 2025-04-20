"use client"

import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bed, Bath, SquareIcon as SquareFeet } from "lucide-react"
import { useMemo } from "react"

// Mock properties data
const properties = [
  {
    id: "1",
    title: "Modern Downtown Apartment",
    location: "123 Main St, New York, NY 10001",
    price: 2500,
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    status: "Available",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: "2",
    title: "Cozy Studio in Brooklyn",
    location: "456 Park Ave, Brooklyn, NY 11201",
    price: 1800,
    bedrooms: 1,
    bathrooms: 1,
    area: 650,
    status: "Rented",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: "3",
    title: "Luxury Penthouse with View",
    location: "789 Ocean Dr, Miami, FL 33139",
    price: 4500,
    bedrooms: 3,
    bathrooms: 2.5,
    area: 2200,
    status: "Available",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: "4",
    title: "Suburban Family Home",
    location: "321 Oak St, Chicago, IL 60007",
    price: 3200,
    bedrooms: 4,
    bathrooms: 3,
    area: 2800,
    status: "Pending",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: "5",
    title: "Downtown Loft",
    location: "555 Market St, San Francisco, CA 94105",
    price: 3800,
    bedrooms: 2,
    bathrooms: 2,
    area: 1500,
    status: "Available",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: "6",
    title: "Beachfront Condo",
    location: "888 Beach Blvd, San Diego, CA 92109",
    price: 3500,
    bedrooms: 2,
    bathrooms: 2,
    area: 1300,
    status: "Available",
    image: "/placeholder.svg?height=600&width=800",
  },
]

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
  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      // Search filter
      if (
        searchQuery &&
        !property.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !property.location.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false
      }

      // Status filter
      if (filters.status && property.status !== filters.status) {
        return false
      }

      // Price range filter
      if (property.price < filters.minPrice || property.price > filters.maxPrice) {
        return false
      }

      // Bedrooms filter
      if (filters.bedrooms && property.bedrooms < Number.parseInt(filters.bedrooms)) {
        return false
      }

      // Bathrooms filter
      if (filters.bathrooms && property.bathrooms < Number.parseInt(filters.bathrooms)) {
        return false
      }

      return true
    })
  }, [searchQuery, filters])

  if (filteredProperties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-lg text-muted-foreground">No properties found matching your criteria.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {filteredProperties.map((property) => (
        <Card key={property.id} className="overflow-hidden">
          <div className="relative aspect-video">
            <Badge
              className={`absolute right-2 top-2 z-10 ${
                property.status === "Available"
                  ? "bg-green-500 hover:bg-green-600"
                  : property.status === "Pending"
                    ? "bg-yellow-500 hover:bg-yellow-600"
                    : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {property.status}
            </Badge>
            <Image src={property.image || "/placeholder.svg"} alt={property.title} fill className="object-cover" />
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
            <p className="font-bold">${property.price}/month</p>
            <a
              href={`/dashboard/properties/${property.id}`}
              className="text-sm font-medium text-teal-600 hover:underline"
            >
              View Details
            </a>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
