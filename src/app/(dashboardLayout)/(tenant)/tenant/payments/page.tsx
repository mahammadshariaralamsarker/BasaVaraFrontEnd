/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  useGetMyOrdersQuery,
  useVerifyPaymentQuery,
  useMakePaymentMutation,
} from "@/redux/apis/tenant.slice";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const PaymentVerificationPage = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");

  const {
    data: verificationData,
    error: verifyError,
    isLoading: isVerifying,
  } = useVerifyPaymentQuery(orderId, { skip: !orderId });

  const {
    data: ordersData,
    error: ordersError,
    isLoading: isOrdersLoading,
  } = useGetMyOrdersQuery(undefined, {
    pollingInterval: 3000,
  });

  const [makePayment, { isLoading: isPaying }] = useMakePaymentMutation();

  const handleRetryPayment = async (order: any) => {
    if (!order?.tenantRequest) {
      alert("Missing tenant request ID.");
      return;
    }

    try {
      const response = await makePayment(order.tenantRequest).unwrap();
      if (response?.data) {
        window.open(response.data, "_blank");
      }
    } catch (error) {
      console.error("Failed to resume payment", error);
      alert("Failed to resume payment.");
    }
  };

  const getVerificationMessage = () => {
    const status = verificationData?.data?.bank_status;

    if (status === "Success") {
      return (
        <div className="mb-10 border border-green-200 bg-green-50 p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold text-green-800 mb-3">
            ✅ Payment Verified Successfully!
          </h2>
          <TransactionDetails data={verificationData.data} />
        </div>
      );
    } else if (status === "Cancel") {
      return (
        <div className="mb-10 border border-yellow-200 bg-yellow-50 p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold text-yellow-800 mb-3">
            ⚠️ Payment Cancelled
          </h2>
          <TransactionDetails data={verificationData.data} />
        </div>
      );
    } else if (status === "Failed") {
      return (
        <div className="mb-10 border border-red-200 bg-red-50 p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold text-red-800 mb-3">
            ❌ Payment Failed
          </h2>
          <TransactionDetails data={verificationData.data} />
        </div>
      );
    }

    return null;
  };

  const TransactionDetails = ({ data }: { data: any }) => (
    <div className="text-sm text-gray-800 space-y-1">
      <p>
        <strong>Cardholder:</strong> {data.card_holder_name}
      </p>
      <p>
        <strong>Email:</strong> {data.email}
      </p>
      <p>
        <strong>Transaction ID:</strong> {data.order_id}
      </p>
      <p>
        <strong>Amount Paid:</strong> ${data.payable_amount}
      </p>
      <p>
        <strong>Method:</strong> {data.method}
      </p>
      <p>
        <strong>Bank Status:</strong> {data.bank_status}
      </p>
      <p>
        <strong>Paid At:</strong>{" "}
        {data.date_time ? new Date(data.date_time).toLocaleString() : "N/A"}
      </p>
    </div>
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Payments</h1>

      {orderId ? (
        <div className="mb-10 bg-blue-50 p-6 rounded-xl border border-blue-200 shadow-sm">
          <h2 className="text-xl font-semibold mb-3 text-blue-700">
            Payment Verification
          </h2>
          {isVerifying && <p>Verifying your payment...</p>}
          {verifyError && (
            <p className="text-red-500">
              Something went wrong during verification.
            </p>
          )}
          {verificationData &&
            verificationData?.data &&
            getVerificationMessage()}
        </div>
      ) : (
        <p className="text-gray-500 italic">
          No payment was attempted. Please try again.
        </p>
      )}

      <div>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Previous Orders
        </h2>
        {isOrdersLoading && <p>Loading your rental history...</p>}
        {ordersError && <p className="text-red-500">Error fetching orders.</p>}

        {ordersData?.data?.length > 0 ? (
          <div className="space-y-6">
            {ordersData.data.map((order: any) => {
              const isPaid = order.status === "Paid";
              const bankStatus = order.transaction?.bank_status;

              return (
                <div
                  key={order._id}
                  className="flex justify-between items-center bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition"
                >
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">
                      {order.product?.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      {order.product?.location}
                    </p>
                    <p className="text-sm text-gray-700 mb-1">
                      <strong>Rent:</strong> ${order.amount}
                    </p>
                    <p className="text-sm text-gray-700 mb-1">
                      <strong>Status:</strong>{" "}
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                          isPaid
                            ? "bg-green-100 text-green-700"
                            : bankStatus === "Cancel"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </p>
                    <p className="text-sm text-gray-700 mb-1">
                      <strong>Paid at:</strong>{" "}
                      {new Date(order.updatedAt).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-700">
                      <strong>Transaction ID:</strong> {order.transaction?.id}
                    </p>
                    <p className="text-sm text-gray-700">
                      <strong>Method:</strong> {order.transaction?.method}
                    </p>
                    <p className="text-sm text-gray-700">
                      <strong>Bank Status:</strong>{" "}
                      {order.transaction?.bank_status}
                    </p>
                  </div>

                  {order.status !== "Paid" && (
                    <button
                      onClick={() => handleRetryPayment(order)}
                      disabled={isPaying}
                      className="bg-gray-900 hover:bg-gray-700 text-white font-semibold px-5 py-2 rounded-lg"
                    >
                      {order.status === "Cancelled"
                        ? "Retry Payment"
                        : order.status === "Pending"
                        ? "Resume Payment"
                        : "Complete Payment"}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500 italic">No previous payments found.</p>
        )}
      </div>
    </div>
  );
};

export default PaymentVerificationPage;
