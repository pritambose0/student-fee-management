"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const [error, setError] = useState(null);
  const router = useRouter();

  const onSubmit = async (data) => {
    setError(null);
    try {
      const res = await axios.post("/api/sign-up", data);
      if (res.data.success) {
        router.replace("/sign-in");
      } else {
        setError(res.data.message || "Sign up failed.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred during sign up." || err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212] px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-[#1e1e2f] p-8 rounded-2xl shadow-2xl border border-gray-700"
      >
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          📝 Create Your Account
        </h2>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Full Name
          </label>
          <input
            {...register("name", { required: true })}
            type="text"
            placeholder="John Doe"
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Email Address
          </label>
          <input
            {...register("email", { required: true })}
            type="email"
            placeholder="you@example.com"
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Password
          </label>
          <input
            {...register("password", { required: true })}
            type="password"
            placeholder="••••••••"
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>

        {/* Sign Up Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white font-semibold py-2 rounded-xl transition-all duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isSubmitting ? "Creating Account..." : "Sign Up"}
        </button>

        {/* Link to Sign In */}
        <div className="mt-6 flex items-center justify-between text-sm text-gray-400">
          <span>Already have an account?</span>
          <Link
            href="/sign-in"
            className="text-blue-400 hover:underline hover:text-blue-300 transition"
          >
            Sign In →
          </Link>
        </div>
      </form>
    </div>
  );
}
