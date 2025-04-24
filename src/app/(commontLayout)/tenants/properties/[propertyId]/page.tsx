"use client";

import { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  useGetSingleListingQuery,
  useSubmitRentalRequestMutation,
} from "@/redux/apis/tenant.slice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Bed, Bath, SquareIcon as SquareFeet, MapPin } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useSelector } from "react-redux";

export default function PropertyDetail() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { propertyId } = useParams();
  const { data, isLoading, isError } = useGetSingleListingQuery(propertyId);
  const [activeImage, setActiveImage] = useState(0);
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [requestSent, setRequestSent] = useState(false);

  const [submitRentalRequest, { isLoading: isSubmitting }] =
    useSubmitRentalRequestMutation();

  const user = useSelector((state) => state.auth.user); // ✅ adjust based on your store
  console.log(user);

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError || !data?.data)
    return (
      <p className="text-center mt-10 text-red-500">Error loading property.</p>
    );

  const property = data.data;
  console.log(property);

  const handleRequestSubmit = async (formValues: {
    moveInDate: string;
    message: string;
  }) => {
    try {
      const payload = {
        products: propertyId,
        message: formValues.message,
      };

      const res = await submitRentalRequest(payload).unwrap();

      if (res?.success === false) {
        toast.warning(res.message || "Something went wrong.");
        return;
      }

      setRequestSent(true);
      setRequestModalOpen(false);
      toast.success("Rental request sent!");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const fallbackMessage = "Failed to send request. Please try again.";
      const errorMessage = err?.data?.message || fallbackMessage;

      toast.error(errorMessage);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">{property.title}</h1>

      {/* Image carousel */}
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
          {property.imageUrls?.map((img: string, index: number) => (
            <button
              key={index}
              className={`relative h-16 w-24 overflow-hidden rounded-md border-2 ${
                activeImage === index ? "border-teal-600" : "border-transparent"
              }`}
              onClick={() => setActiveImage(index)}
            >
              <Image
                src={img}
                alt={`Image ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </Card>

      <Tabs defaultValue="details">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="location">Location</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Property Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {property.description}
              </p>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-muted-foreground">Status</span>
                  <Badge
                    className={`w-fit ${
                      property.houseStatus === "available"
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-blue-500 hover:bg-blue-600"
                    }`}
                  >
                    {property.houseStatus}
                  </Badge>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">
                    Listed On
                  </span>
                  <p className="text-sm font-medium">
                    {new Date(property.createdAt).toLocaleDateString()}
                  </p>
                </div>
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
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Summary & Request Rental */}
      <Card>
        <CardHeader>
          <CardTitle>Property Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-2xl font-bold text-teal-700">
              ${property.rent}/month
            </p>
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

          {user?.role === "tenant" &&
            (property.houseStatus === "rented" ? (
              <Button disabled className="w-full mt-4 bg-gray-400">
                Already Rented
              </Button>
            ) : requestSent ? (
              <Button disabled className="w-full mt-4 bg-gray-400">
                Request Sent
              </Button>
            ) : (
              <Button
                onClick={() => setRequestModalOpen(true)}
                className="w-full mt-4 bg-teal-600 hover:bg-teal-700 text-white"
              >
                Request Rental
              </Button>
            ))}

          {/* Rental Button
          {rentalResponse?.houseStatus === "rented" ? (
            <Button disabled className="w-full mt-4 bg-gray-400">
              Already Rented
            </Button>
          ) : requestSent ? (
            <Button disabled className="w-full mt-4 bg-gray-400">
              Request Sent
            </Button>
          ) : (
            <Button
              onClick={() => setRequestModalOpen(true)}
              className="w-full mt-4 bg-teal-600 hover:bg-teal-700 text-white"
            >
              Request Rental
            </Button>
          )}

          {/* Payment Option */}
          {/* {rentalResponse?.rentalStatus === "Approved" && (
            <Button className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white">
              Proceed to Payment
            </Button>
          )} */}
        </CardContent>
      </Card>

      {/* Request Modal */}
      <Dialog open={requestModalOpen} onOpenChange={setRequestModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Rental</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={handleSubmit(handleRequestSubmit)}
            className="space-y-4"
          >
            <div>
              <Label>Move-in Date</Label>
              <Input
                type="date"
                {...register("moveInDate", { required: true })}
              />
              {errors.moveInDate && (
                <p className="text-sm text-red-500">Move-in date is required</p>
              )}
            </div>
            <div>
              <Label>Message</Label>
              <Input
                type="text"
                placeholder="Optional message to landlord"
                {...register("message")}
              />
            </div>
            <DialogFooter>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-teal-600 hover:bg-teal-700"
              >
                {isSubmitting ? "Sending..." : "Send Request"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
