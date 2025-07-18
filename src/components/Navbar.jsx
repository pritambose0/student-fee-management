"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { status } = useSession();
  const pathname = usePathname();

  const links = [
    { href: "/", label: "All Students" },
    { href: "/profile", label: "Profile" },
  ];

  return (
    <nav className="font-sans bg-slate-900/80 backdrop-blur-md text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl sm:text-2xl font-bold text-white tracking-wide"
        >
          🎯 Logo
        </Link>

        {/* Navigation Links */}
        <div className="hidden sm:flex items-center gap-2">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              <span
                className={`text-sm px-4 py-2 rounded-full font-medium cursor-pointer transition-all duration-200 relative
              ${
                pathname === link.href
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-300 hover:text-white hover:bg-blue-700/20"
              }`}
              >
                {link.label}
              </span>
            </Link>
          ))}

          {status === "authenticated" && (
            <button
              onClick={() => signOut()}
              className="ml-3 text-sm px-4 py-2 rounded-full font-medium text-gray-300 hover:text-white hover:bg-red-600/50 transition-all duration-300 cursor-pointer"
            >
              🚪 Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle (Optional) */}
        {/* <div className="sm:hidden">
      <MobileMenu /> 
    </div> */}
      </div>
    </nav>
  );
}
