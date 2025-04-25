/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  useGetMyOrdersQuery,
  useVerifyPaymentQuery,
  useMakePaymentMutation,
} from "@/redux/apis/tenant.slice";
import { useSearchParams } from "next/navigation";

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

    const messageStyle = {
      Success: "bg-green-50 border-green-200 text-green-800",
      Cancel: "bg-yellow-50 border-yellow-200 text-yellow-800",
      Failed: "bg-red-50 border-red-200 text-red-800",
    }[status] || "bg-gray-50 border-gray-200 text-gray-800";

    const icon = {
      Success: "✅",
      Cancel: "⚠️",
      Failed: "❌",
    }[status];

    return (
      <div className={`mb-10 border p-6 rounded-2xl shadow-sm ${messageStyle}`}>
        <h2 className="text-xl font-semibold mb-3">
          {icon} Payment {status}
        </h2>
        <TransactionDetails data={verificationData.data} />
      </div>
    );
  };

  const TransactionDetails = ({ data }: { data: any }) => (
    <div className="text-sm text-gray-800 space-y-1">
      <p><strong>Cardholder:</strong> {data.card_holder_name}</p>
      <p><strong>Email:</strong> {data.email}</p>
      <p><strong>Transaction ID:</strong> {data.order_id}</p>
      <p><strong>Amount Paid:</strong> ${data.payable_amount}</p>
      <p><strong>Method:</strong> {data.method}</p>
      <p><strong>Bank Status:</strong> {data.bank_status}</p>
      <p><strong>Paid At:</strong> {data.date_time ? new Date(data.date_time).toLocaleString() : "N/A"}</p>
    </div>
  );

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Your Payments</h1>

      {orderId ? (
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4 text-blue-800">Payment Verification</h2>
          {isVerifying && <p className="text-sm text-gray-500">Verifying your payment...</p>}
          {verifyError && <p className="text-sm text-red-500">Something went wrong during verification.</p>}
          {verificationData?.data && getVerificationMessage()}
        </div>
      ) : (
        <p className="text-gray-500 italic mb-6">No payment was attempted. Please try again.</p>
      )}

      <div>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Previous Orders</h2>

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
                  className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white border border-gray-200 p-5 rounded-2xl shadow-sm hover:shadow-md transition gap-4"
                >
                  <div className="flex-1 space-y-1">
                    <h3 className="text-lg font-semibold text-gray-900">{order.product?.title}</h3>
                    <p className="text-sm text-gray-600">{order.product?.location}</p>
                    <p className="text-sm"><strong>Rent:</strong> ${order.amount}</p>
                    <p className="text-sm">
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
                    <p className="text-sm"><strong>Paid at:</strong> {new Date(order.updatedAt).toLocaleString()}</p>
                    <p className="text-sm"><strong>Transaction ID:</strong> {order.transaction?.id}</p>
                    <p className="text-sm"><strong>Method:</strong> {order.transaction?.method}</p>
                    <p className="text-sm"><strong>Bank Status:</strong> {order.transaction?.bank_status}</p>
                  </div>

                  {!isPaid && (
                    <button
                      onClick={() => handleRetryPayment(order)}
                      disabled={isPaying}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
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
