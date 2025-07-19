"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const { status } = useSession();
  const pathname = usePathname();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { href: "/", label: "All Students" },
    { href: "/profile", label: "Profile" },
  ];

  const toggleMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const handleSignOut = () => {
    setMobileMenuOpen(false);
    signOut();
  };

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

        {/* Desktop Links */}
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
              onClick={handleSignOut}
              className="ml-3 text-sm px-4 py-2 rounded-full font-medium text-gray-300 hover:text-white hover:bg-red-600/50 transition-all duration-300 cursor-pointer"
            >
              🚪 Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="sm:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-300 hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden px-6 pb-4 space-y-2 bg-slate-900/90 backdrop-blur-md">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block text-sm px-4 py-2 rounded-md font-medium transition-all duration-200
              ${
                pathname === link.href
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:text-white hover:bg-blue-700/20"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {status === "authenticated" && (
            <button
              onClick={handleSignOut}
              className="block w-full text-left text-sm px-4 py-2 rounded-md font-medium text-gray-300 hover:text-white hover:bg-red-600/50 transition-all duration-200"
            >
              🚪 Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
