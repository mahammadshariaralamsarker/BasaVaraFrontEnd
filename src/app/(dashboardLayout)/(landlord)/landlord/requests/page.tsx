"use client";

import { Button } from "@/components/ui/button";
import {
  useGetRentalRequestsQuery,
  useRespondToRequestMutation,
} from "@/redux/apis/landlordslice";

const RequestList = () => {
  const { data: response, isLoading, error } = useGetRentalRequestsQuery();
  const [respondToRequest, { isLoading: isResponding }] =
    useRespondToRequestMutation();

  const requests = response?.data ?? [];
  console.log("Rental Requests Data:", requests);

  const handleResponse = async (
    requestId: string,
    status: "Approved" | "Rejected"
  ) => {
    try {
      await respondToRequest({ requestId, data: { status } }).unwrap();
    } catch (err) {
      console.error("Failed to respond to request:", err);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong</div>;

  return (
    <div className="space-y-4">
      {requests.map((request) => (
        <div
          key={request._id}
          className="rounded-lg border bg-card text-card-foreground shadow-sm"
        >
          <div className="p-6 space-y-2">
            <div>
              <p className="font-semibold">Tenant: {request.tenant?.name}</p>
              <p className="text-sm text-muted-foreground">
                {request.tenant?.email} | {request.tenant?.phone}
              </p>
            </div>

            <div>
              <p className="font-semibold">
                Property: {request.products?.title}
              </p>
              <p className="text-sm text-muted-foreground">
                Rent: ${request.products?.rent} | Location:{" "}
                {request.products?.location}
              </p>
            </div>

            <div>
              <p className="text-sm">Message: {request.message}</p>
              <p className="text-sm">
                Payment:{" "}
                <span className="text-muted-foreground">
                  {request.paymentStatus ?? "N/A"}
                </span>
              </p>
            </div>

            <div className="flex items-center justify-between mt-2">
              <p className="text-sm">
                Status:{" "}
                <span className="font-medium text-primary">
                  {request.status}
                </span>
              </p>
              {request.status === "Pending" ? (
                <div className="flex gap-2 mt-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleResponse(request._id, "Approved")}
                    disabled={isResponding}
                  >
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleResponse(request._id, "Rejected")}
                    disabled={isResponding}
                  >
                    Reject
                  </Button>
                </div>
              ) : (
                <div className="mt-4">
                  <Button
                    size="sm"
                    variant={
                      request.status === "Approved" ? "outline" : "destructive"
                    }
                    disabled
                  >
                    {request.status}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RequestList;
