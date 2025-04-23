"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
  },
]

interface PropertyTableProps {
  searchQuery?: string
  filters?: {
    status: string
    minPrice: number
    maxPrice: number
    bedrooms: string
    bathrooms: string
  }
}

export default function PropertyTable({
  searchQuery = "",
  filters = { status: "", minPrice: 0, maxPrice: 5000, bedrooms: "", bathrooms: "" },
}: PropertyTableProps) {
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
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Property</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Details</TableHead>
            <TableHead className="w-[80px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProperties.map((property) => (
            <TableRow key={property.id}>
              <TableCell className="font-medium">
                <a href={`/dashboard/properties/${property.id}`} className="hover:underline">
                  {property.title}
                </a>
              </TableCell>
              <TableCell>{property.location}</TableCell>
              <TableCell>${property.price}/month</TableCell>
              <TableCell>
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
              </TableCell>
              <TableCell>
                {property.bedrooms} bd | {property.bathrooms} ba | {property.area} sqft
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem asChild>
                      <a href={`/dashboard/properties/${property.id}`}>View</a>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <a href={`/dashboard/properties/${property.id}/edit`}>Edit</a>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
