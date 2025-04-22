import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bed, Bath, SquareIcon as SquareFeet } from "lucide-react"
import Link from "next/link"

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
]

export default function PropertyList({ limit = 10 }: { limit?: number }) {
  const displayProperties = properties.slice(0, limit)

  return (
    <div className="space-y-4">
      {displayProperties.map((property) => (
        <Card key={property.id} className="overflow-hidden">
          <CardContent className="p-0">
            <Link href={`/dashboard/properties/${property.id}`} className="flex flex-col md:flex-row">
              <div className="relative h-48 w-full md:h-auto md:w-48">
                <Image src={property.image || "/placeholder.svg"} alt={property.title} fill className="object-cover" />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="font-semibold">{property.title}</h3>
                    <p className="text-sm text-muted-foreground">{property.location}</p>
                  </div>
                  <Badge
                    className={
                      property.status === "Available"
                        ? "mt-2 md:mt-0 bg-green-500 hover:bg-green-600"
                        : property.status === "Pending"
                          ? "mt-2 md:mt-0 bg-yellow-500 hover:bg-yellow-600"
                          : "mt-2 md:mt-0 bg-blue-500 hover:bg-blue-600"
                    }
                  >
                    {property.status}
                  </Badge>
                </div>
                <div className="mt-4 flex flex-wrap gap-4">
                  <div className="flex items-center gap-1">
                    <Bed className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{property.bedrooms} Beds</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{property.bathrooms} Baths</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <SquareFeet className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{property.area} sqft</span>
                  </div>
                </div>
                <div className="mt-auto pt-4">
                  <p className="font-bold text-lg">${property.price}/month</p>
                </div>
              </div>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
