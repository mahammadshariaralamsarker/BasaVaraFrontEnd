"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bed, Bath, SquareIcon as SquareFeet, MapPin } from "lucide-react";
import { IProduct } from "@/lib/types/product";
import LoadingPage from "@/app/loading";
import { useGetAllListingTenantQuery } from "@/redux/apis/tenant.slice";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const Properties = ({ limit }: { limit?: number }) => {
  const { data, isLoading, isError } = useGetAllListingTenantQuery(undefined);
  const [showAll, setShowAll] = useState(false);

  if (isLoading) return <LoadingPage />;
  if (isError || !data?.data) return <p>Failed to load listings.</p>;

  const initialLimit = limit || 6;
  const properties = showAll ? data.data : data.data.slice(0, initialLimit);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property: IProduct) => (
          <Card
            key={property._id}
            className="hover:shadow-lg transition-shadow"
          >
            <Link href={`/tenants/properties/${property._id}`}>
              <CardHeader className="p-0 relative">
                <div className="relative aspect-video w-full">
                  <Image
                    src={property.imageUrls?.[0] || "/placeholder.svg"}
                    alt={property.title}
                    fill
                    className="object-cover rounded-t-lg"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <Badge
                    variant={
                      property.houseStatus === "available"
                        ? "default"
                        : "secondary"
                    }
                    className="absolute top-2 left-2"
                  >
                    {property.houseStatus}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold line-clamp-1">
                    {property.title}
                  </h3>
                  <p className="font-bold text-primary">${property.rent}/mo</p>
                </div>

                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span className="line-clamp-1">{property.location}</span>
                </div>

                <div className="flex justify-between pt-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Bed className="h-4 w-4" />
                    <span>{property.bedrooms} Beds</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Bath className="h-4 w-4" />
                    <span>{property.bathrooms} Baths</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <SquareFeet className="h-4 w-4" />
                    <span>{property.area} sqft</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex justify-between items-center p-4 border-t">
                <p className="text-sm text-muted-foreground">
                  Listed {new Date(property.createdAt).toLocaleDateString()}
                </p>
                <Button
                  variant="link"
                  size="sm"
                  className="text-primary p-0 h-auto"
                >
                  View Details
                </Button>
              </CardFooter>
            </Link>
          </Card>
        ))}
      </div>

      {!showAll && data.data.length > initialLimit && (
        <div className="text-center mt-8">
          <Button
            onClick={() => setShowAll(true)}
            className="bg-teal-500 hover:bg-teal-600 text-white"
          >
            See More Properties
          </Button>
        </div>
      )}
    </div>
  );
};
