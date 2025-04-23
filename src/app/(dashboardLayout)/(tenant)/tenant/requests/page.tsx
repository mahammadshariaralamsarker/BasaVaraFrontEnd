/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

import {
  useGetMyRequestsQuery,
  useMakePaymentMutation,
} from "@/redux/apis/tenant.slice";

const MyRequestsPage = () => {
  // const token = useSelector((state: any) => state.auth.token);

  const { data, isLoading } = useGetMyRequestsQuery(undefined);

  const [makePayment, { isLoading: isPaying }] = useMakePaymentMutation();

  if (isLoading) return <div className="p-4">Loading...</div>;

  const handleSubmit = async (tenantRequestId: string) => {
    console.log(tenantRequestId);
    try {
      const response = await makePayment(tenantRequestId).unwrap();
      console.log(response);
      if (response?.data) {
        window.open(response?.data, "_blank");
      }
    } catch (error) {
      alert(error);
      console.error("Payment initiation failed", error);
      alert("Failed to initiate payment.");
    }
  };

  return (
    <div className="p-4 flex flex-col gap-4">
      {data?.data?.map((request: any) => {
        const product = request.products;

        return (
          <div
            key={request._id}
            className="bg-white rounded-xl shadow-md flex overflow-hidden"
          >
            {/* Left: Full Height Image */}
            <div className="w-60 h-full">
              <Image
                src={(product?.imageUrls?.[0] || "/placeholder.png").trim()}
                alt="Property"
                width={240}
                height={180}
                className="object-cover h-full w-full"
              />
            </div>

            <div className="flex flex-col justify-between p-4 flex-1">
              <div>
                <h2 className="text-xl font-bold">{product?.title}</h2>
                <p className="text-sm text-gray-600">{product?.location}</p>
                <p className="text-sm text-gray-500">{product?.description}</p>
                <p className="text-sm">
                  <strong>Rent:</strong> ${product?.rent}
                </p>
                <p className="text-sm">
                  <strong>Message:</strong> {request.message}
                </p>
                <p className="text-sm">
                  <strong>Phone:</strong> {request.phone || "N/A"}
                </p>
                <p className="text-sm">
                  <strong>Status:</strong> {request?.status}
                </p>
              </div>

              {/* Right: Info + Status + Button */}
              <div className="flex items-center justify-between mt-4">
                <p
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    request.paymentStatus === "Paid"
                      ? "bg-green-100 text-green-800"
                      : request.paymentStatus === "Pending"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  Payment Status: {request.paymentStatus}
                </p>

                <Button
                  className="ml-4"
                  disabled={
                    request?.status !== "Approved" ||
                    isPaying ||
                    request.paymentStatus === "Paid"
                  }
                  onClick={() => handleSubmit(request._id)}
                >
                  Pay Nows
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyRequestsPage;
