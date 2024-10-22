"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";


export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    // Set the active link based on the current path
    setActiveLink(window.location.pathname);
  }, []);

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-white shadow-md z-50 rounded-full max-w-4xl w-full">
      <div className="px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="">
              <img
                src="/ettara-logo.png" // Update this to the actual path of your logo image
                alt="Logo"
                className="h-4 w-auto" // Adjust height and width as needed
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              <Link
                href=""
                className={`text-gray-800 hover:text-gray-600 px-3 py-2 text-sm font-medium ${
                  activeLink === "/" ? "font-bold text-orange-500" : ""
                }`}
              >
                Home
              </Link>
              <Link
                href="../login"
                className={`text-gray-800 hover:text-gray-600 px-3 py-2 text-sm font-medium ${
                  activeLink === "/events" ? "font-bold text-orange-500" : ""
                }`}
              >
                Events
              </Link>
              <Link
                href="../login"
                className={`text-gray-800 hover:text-gray-600 px-3 py-2 text-sm font-medium ${
                  activeLink === "/booking" ? "font-bold text-orange-500" : ""
                }`}
              >
                Booking
              </Link>
              <Link
                href="../aboutus"
                className={`text-gray-800 hover:text-gray-600 px-3 py-2 text-sm font-medium ${
                  activeLink === "/about" ? "font-bold text-orange-500" : ""
                }`}
              >
                About Us
              </Link>
              <Link href="../login">
                <button className="text-white bg-orange-500 hover:bg-orange-600 px-5 py-2 rounded-full text-sm font-medium">
                  Login
                </button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className={`text-gray-800 hover:bg-gray-200 block px-3 py-2 rounded-md text-base font-medium ${
                activeLink === "/" ? "font-bold text-orange-500" : ""
              }`}
            >
              Home
            </Link>
            <Link
              href="/events"
              className={`text-gray-800 hover:bg-gray-200 block px-3 py-2 rounded-md text-base font-medium ${
                activeLink === "/events" ? "font-bold text-orange-500" : ""
              }`}
            >
              Events
            </Link>
            <Link
              href="/booking"
              className={`text-gray-800 hover:bg-gray-200 block px-3 py-2 rounded-md text-base font-medium ${
                activeLink === "/booking" ? "font-bold text-orange-500" : ""
              }`}
            >
              Booking
            </Link>
            <Link
              href="/about"
              className={`text-gray-800 hover:bg-gray-200 block px-3 py-2 rounded-md text-base font-medium ${
                activeLink === "/about" ? "font-bold text-orange-500" : ""
              }`}
            >
              About Us
            </Link>
            <Link
              href="/login"
              className={`text-gray-800 hover:bg-gray-200 block px-3 py-2 rounded-md text-base font-medium ${
                activeLink === "/login" ? "font-bold text-orange-500" : ""
              }`}
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
