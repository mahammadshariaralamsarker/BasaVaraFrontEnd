"use client"

import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { useMemo } from "react"
import { useGetOwnListingsQuery } from "@/redux/apis/landlordslice"



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
 const { data, isLoading, error } = useGetOwnListingsQuery();
  const properties = useMemo(() => (data ? data.data : []), [data]);
  console.log(properties);
 
  const filteredProperties = useMemo(() => {
    return properties?.filter((property) => {
      const price = parseFloat(property.rent)
      const bedrooms = parseInt(property.bedrooms)
      const bathrooms = parseInt(property.bathrooms)

      if (
        searchQuery &&
        !property.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !property.location.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false
      }

      if (filters.status && property.houseStatus?.toLowerCase() !== filters.status.toLowerCase()) {
        return false
      }

      if (price < filters.minPrice || price > filters.maxPrice) {
        return false
      }

      if (filters.bedrooms && bedrooms < Number(filters.bedrooms)) {
        return false
      }

      if (filters.bathrooms && bathrooms < Number(filters.bathrooms)) {
        return false
      }

      return true
    })
  }, [searchQuery, filters, properties])

  if (isLoading) {
    return <div className="flex justify-center py-12 text-muted-foreground">Loading properties...</div>
  }

  if (error) {
    return <div className="flex justify-center py-12 text-red-500">Error fetching properties</div>
  }

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
            <TableRow key={property._id}>
              <TableCell className="font-medium">
                <Link href={`/landlord/properties/${property._id}`} className="hover:underline">
                  {property.title}
                </Link>
              </TableCell>
              <TableCell>{property.location}</TableCell>
              <TableCell>${property.rent}/month</TableCell>
              <TableCell>
                <Badge
                  className={
                    property.houseStatus === "available"
                      ? "bg-green-500 hover:bg-green-600"
                      : property.houseStatus === "rented"
                      ? "bg-blue-500 hover:bg-blue-600"
                      : "bg-yellow-500 hover:bg-yellow-600"
                  }
                >
                  {property.houseStatus ?? "Pending"}
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
                      <Link href={`/landlord/properties/${property._id}`}>View</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/landlord/properties/${property._id}/edit`}>Edit</Link>
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
