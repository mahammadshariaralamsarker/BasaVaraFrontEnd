"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bed, Bath, SquareIcon as SquareFeet } from "lucide-react"; 
import { IProduct } from "@/lib/types/product";
import LoadingPage from "@/app/loading";
import { useGetAllListingTenantQuery } from "@/redux/apis/tenant.slice";

export const Properties = ({ limit }: { limit?: number }) => {
  const { data, isLoading, isError } = useGetAllListingTenantQuery(undefined);

  if (isLoading) return <LoadingPage/>;
  if (isError || !data?.data) return <p>Failed to load listings.</p>;

  const properties = limit ? data.data.slice(0, limit) : data.data;

  return (
    <div className="space-y-4">
      {properties.map((property: IProduct) => (
        <Card key={property._id} className="overflow-hidden">
          <CardContent className="p-0">
            <Link
              href={`/tenant/properties/${property._id}`}
              className="flex flex-col md:flex-row"
            >
              <div className="relative h-48 w-full md:h-auto md:w-48">
                <Image
                  src={property.imageUrls?.[0] || "/placeholder.svg"}
                  alt={property.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="font-semibold">{property.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {property.location}
                    </p>
                  </div>
                  <Badge
                    className={
                      property.houseStatus === "available"
                        ? "mt-2 md:mt-0 bg-green-500 hover:bg-green-600"
                        : "mt-2 md:mt-0 bg-blue-500 hover:bg-blue-600"
                    }
                  >
                    {property.houseStatus}
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
                  <p className="font-bold text-lg">${property.rent}/month</p>
                </div>
              </div>
            </Link>
          </CardContent>

          <CardFooter className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 border-t p-4">
            <p className="text-sm text-muted-foreground">
              Listed on {new Date(property.createdAt).toLocaleDateString()}
            </p>
            <Link
              href={`/tenants/properties/${property._id}`}
              className="text-sm font-medium text-teal-600 hover:underline"
            >
              View Details
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
