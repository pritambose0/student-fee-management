"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [user, setUser] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get(`/api/users/${session?.user?._id}`);
        setUser(response.data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching user:", error);
      }
    }
    if (status === "unauthenticated") {
      router.push("/sign-in");
    }
    if (status === "authenticated") {
      fetchUser();
    }
  }, [status, session, reset]);

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      const response = await axios.put(
        `/api/users/${session?.user?._id}`,
        data
      );
      const updatedUser = response.data.data;
      setUser(updatedUser);
      setEditing(false);
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
      console.error("Error updating user:", error);
    }
  };

  return loading ? (
    <>
      <div className="max-w-2xl mx-auto mt-12 px-6 sm:px-8 animate-pulse">
        <div className="bg-[#1e1e2f] text-white rounded-2xl shadow-2xl p-8 sm:p-10 space-y-8 border border-gray-700">
          <div className="h-10 bg-[#2d2d3a] w-1/2 mx-auto rounded"></div>

          {/* Name */}
          <div className="space-y-2">
            <div className="h-4 w-20 bg-[#2d2d3a] rounded"></div>
            <div className="h-10 w-full bg-[#2d2d3a] rounded"></div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <div className="h-4 w-20 bg-[#2d2d3a] rounded"></div>
            <div className="h-10 w-full bg-[#2d2d3a] rounded"></div>
          </div>

          {/* Fees Paid */}
          <div className="space-y-2">
            <div className="h-4 w-28 bg-[#2d2d3a] rounded"></div>
            <div className="h-6 w-1/3 bg-[#2d2d3a] rounded"></div>
          </div>

          {/* Pay Fees Button */}
          <div className="h-10 w-full bg-[#2d2d3a] rounded-xl"></div>

          {/* Edit Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <div className="h-10 w-24 bg-[#2d2d3a] rounded-xl"></div>
            <div className="h-10 w-24 bg-[#2d2d3a] rounded-xl"></div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <div className="max-w-2xl mx-auto mt-12 px-6 sm:px-8">
      <div className="bg-[#1e1e2f] text-white rounded-2xl shadow-2xl p-8 sm:p-10 space-y-10 border border-gray-700 transition-all duration-300">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-white drop-shadow-md">
          🎓 Your Profile
        </h1>

        {status === "authenticated" && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">
                Full Name
              </label>
              {editing ? (
                <>
                  <input
                    {...register("name", { required: "Name is required" })}
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </>
              ) : (
                <p className="text-gray-100 text-lg font-medium">
                  {user?.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">
                Email Address
              </label>
              {editing ? (
                <>
                  <input
                    type="email"
                    {...register("email")}
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </>
              ) : (
                <p className="text-gray-100 text-lg font-medium">
                  {user?.email}
                </p>
              )}
            </div>

            {/* Fees Paid Status */}
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">
                Fee Payment Status
              </label>
              <p className="text-lg font-semibold">
                {user?.feesPaid ? (
                  <span className="text-green-400">✅ Paid</span>
                ) : (
                  <span className="text-red-400">❌ Not Paid</span>
                )}
              </p>
            </div>

            {/* Pay Fees CTA */}
            {!user?.feesPaid && (
              <Link
                href={"/pay-fees"}
                className="block w-full text-center bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-xl"
              >
                💳 Pay Now
              </Link>
            )}

            {/* Edit / Save / Cancel Buttons */}
            <div className="pt-6 flex justify-between gap-3">
              {editing ? (
                <div className="flex justify-end gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-green-600 hover:bg-green-500 text-white px-5 py-3 rounded-xl font-medium transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Saving..." : "💾 Save"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      reset({
                        name: session.user.name || "",
                        email: session.user.email || "",
                      });
                      setEditing(false);
                    }}
                    className="bg-gray-500 hover:bg-gray-400 text-white px-5 py-2 rounded-xl font-medium transition-all cursor-pointer"
                  >
                    ❌ Cancel
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    reset({
                      name: user?.name || "",
                      email: user?.email || "",
                    });
                    setEditing(true);
                  }}
                  className="w-full bg-yellow-500 hover:bg-yellow-400 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer"
                >
                  ✏️ Edit Details
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
