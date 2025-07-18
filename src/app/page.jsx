"use client";

import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get("/api/users");
        setUsers(response.data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching users:", error);
      }
    }

    fetchUsers();
  }, []);

  return loading ? (
    <div className="w-full max-w-5xl overflow-x-auto pt-20 mx-auto px-4 animate-pulse">
      <table className="min-w-full border-collapse text-sm sm:text-base bg-[#1e1e2f] text-white shadow-xl rounded-xl overflow-hidden">
        <thead className="bg-[#2a2a40] text-left">
          <tr>
            <th className="px-6 py-4 font-semibold text-gray-300">Name</th>
            <th className="px-6 py-4 font-semibold text-gray-300">Email</th>
            <th className="px-6 py-4 font-semibold text-gray-300">Fees Paid</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(5)].map((_, index) => (
            <tr
              key={index}
              className={`border-t border-gray-700 ${
                index % 2 === 0 ? "bg-[#25253a]" : "bg-[#202034]"
              }`}
            >
              <td className="px-6 py-4">
                <div className="h-4 bg-[#2f2f45] rounded w-32"></div>
              </td>
              <td className="px-6 py-4">
                <div className="h-4 bg-[#2f2f45] rounded w-48"></div>
              </td>
              <td className="px-6 py-4">
                <div className="h-4 bg-[#2f2f45] rounded w-16"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-3 sm:p-20">
      <h1 className="text-4xl font-bold text-center mt-40 sm:mt-12 mb-20">
        Welcome to Student Fee Management
      </h1>
      {/* Student Table */}
      <div className="w-full max-w-5xl overflow-x-auto pt-40 sm:pt-20 mx-auto px-4">
        <table className="min-w-full border-collapse text-sm sm:text-base bg-[#1e1e2f] text-white shadow-xl rounded-xl overflow-hidden">
          <thead className="bg-[#2a2a40] text-left">
            <tr>
              <th className="px-6 py-4 font-semibold tracking-wide text-gray-200">
                Name
              </th>
              <th className="px-6 py-4 font-semibold tracking-wide text-gray-200">
                Email
              </th>
              <th className="px-6 py-4 font-semibold tracking-wide text-gray-200">
                Fees Paid
              </th>
            </tr>
          </thead>
          <tbody>
            {users?.length > 0 ? (
              users.map((student, index) => (
                <tr
                  key={index}
                  className={`border-t border-gray-700 hover:bg-[#2f2f45] transition duration-200 ${
                    index % 2 === 0 ? "bg-[#25253a]" : "bg-[#202034]"
                  }`}
                >
                  <td className="px-6 py-4">{student.name}</td>
                  <td className="px-6 py-4">{student.email}</td>
                  <td className="px-6 py-4">
                    {student.feesPaid ? (
                      <span className="text-green-400 font-medium">✅ Yes</span>
                    ) : (
                      <span className="text-red-400 font-medium">❌ No</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center px-6 py-8 text-gray-400">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
