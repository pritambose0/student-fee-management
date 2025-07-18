"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function PayFeesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [feePaymentStatus, setFeePaymentStatus] = useState(true);
  const [feesPaid, setFeesPaid] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState({
    name: "",
    card: "",
    expiry: "",
    cvv: "",
  });

  useEffect(() => {
    async function fetchFeesPaid() {
      setFeePaymentStatus(true);
      try {
        const response = await axios.get(`/api/users/${session?.user?._id}`);
        setFeesPaid(response.data.data.feesPaid);
        setFeePaymentStatus(false);
      } catch (error) {
        setFeePaymentStatus(false);
        console.error("Error fetching user fees payment status:", error);
      }
    }

    if (status === "unauthenticated") {
      router.push("/sign-in");
    }
    if (status === "authenticated") {
      fetchFeesPaid();
    }
  }, [status, session]);

  const handlePayment = async () => {
    setLoading(true);

    try {
      const res = await axios.post("/api/pay-fees", {
        id: session.user._id,
      });

      if (res.data.success) {
        setFeesPaid(true);
        router.push("/profile");
      }
    } catch (err) {
      console.error(err);
      alert("Error simulating payment.");
    } finally {
      setLoading(false);
    }
  };

  return feePaymentStatus ? (
    <div className="max-w-xl mx-auto mt-20 p-6 bg-[#1e1e2f] text-white rounded shadow-lg text-center animate-pulse">
      <div className="h-8 w-2/3 bg-[#2d2d3a] mx-auto mb-6 rounded"></div>
      <div className="h-6 w-1/2 bg-[#2d2d3a] mx-auto mb-2 rounded"></div>
      <div className="h-6 w-1/3 bg-[#2d2d3a] mx-auto rounded"></div>
    </div>
  ) : (
    <div className="font-sans w-[90%] sm:w-full max-w-xl mx-auto mt-20 p-6 bg-[#1e1e2f] text-white rounded-xl shadow-lg text-center">
      <h1 className="text-3xl font-bold mb-4">Simulated Payment</h1>
      <p className="text-lg mb-6">
        Fees Paid:{" "}
        <span className={feesPaid ? "text-green-400" : "text-red-400"}>
          {feesPaid ? "Yes" : "No"}
        </span>
      </p>

      {!feesPaid && (
        <>
          <form className="space-y-4 text-left max-w-md mx-auto">
            <div>
              <label className="block text-sm mb-1 text-gray-300">
                Name on Card
              </label>
              <input
                type="text"
                value={paymentDetails.name}
                onChange={(e) =>
                  setPaymentDetails({ ...paymentDetails, name: e.target.value })
                }
                className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="John Doe"
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-gray-300">
                Card Number
              </label>
              <input
                type="text"
                value={paymentDetails.card}
                onChange={(e) =>
                  setPaymentDetails({ ...paymentDetails, card: e.target.value })
                }
                className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="1234 5678 9012 3456"
                required
              />
            </div>
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block text-sm mb-1 text-gray-300">
                  Expiry
                </label>
                <input
                  type="text"
                  value={paymentDetails.expiry}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/^\d{0,2}(\/\d{0,2})?$/.test(val)) {
                      setPaymentDetails({
                        ...paymentDetails,
                        expiry: val,
                      });
                    }
                  }}
                  className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="MM/YY"
                  maxLength={5}
                  required
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm mb-1 text-gray-300">CVV</label>
                <input
                  type="password"
                  value={paymentDetails.cvv}
                  onChange={(e) =>
                    setPaymentDetails({
                      ...paymentDetails,
                      cvv: e.target.value,
                    })
                  }
                  maxLength={3}
                  className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="123"
                  required
                />
              </div>
            </div>
          </form>

          <button
            onClick={handlePayment}
            disabled={
              loading ||
              !paymentDetails.name ||
              !paymentDetails.card ||
              !paymentDetails.expiry ||
              !paymentDetails.cvv
            }
            className="mt-6 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded font-semibold text-white transition duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </>
      )}

      {feesPaid && (
        <p className="mt-6 text-green-400 text-lg font-medium">
          Payment successful!
        </p>
      )}
    </div>
  );
}
