"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bed, Bath, SquareIcon as SquareFeet, MapPin } from "lucide-react";
import { IProduct } from "@/lib/types/product";
import LoadingPage from "@/app/loading";
import { useGetAllListingTenantQuery } from "@/redux/apis/tenant.slice";
import { Button } from "@/components/ui/button";

export const HeroSection = ({ limit }: { limit?: number }) => {
  const { data, isLoading, isError } = useGetAllListingTenantQuery(undefined);

  if (isLoading) return <LoadingPage />;
  if (isError || !data?.data) return <p>Failed to load listings.</p>;

  const properties = limit ? data.data.slice(0, limit) : data.data;

  return (
    <section className="w-[90%] px-6 py-32 max-w-7xl mx-auto">
      {/* Hero Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
          Find Your Perfect{" "}
          <span className="text-teal-500">Rental House Today!</span>
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          BasaFinder connects you to your next rental home—fast, easy, and
          smart.
        </p>
        <Button asChild variant="outline" className="border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white">
          <Link href="/post-rental">
            Post Rental House Info
          </Link>
        </Button>
      </div>

      {/* Property Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.slice(0,3).map((property: IProduct) => (
          <Card key={property._id} className="hover:shadow-lg transition-shadow">
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
                    <span>{property.bedrooms} Baths</span>
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

      {/* See More Button */}
      {data.data.length > 3 && (
        <div className="text-center mt-8">
          <Button asChild className="bg-teal-500 hover:bg-teal-600 text-white">
            <Link href="/tenants">
              See More Properties
            </Link>
          </Button>
        </div>
      )}
    </section>
  );
};