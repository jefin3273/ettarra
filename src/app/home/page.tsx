"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import UpcomingEvents from "../Main-Events/page";

// Navbar Component
function Navbar() {
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
            <Link href="../home">
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
                href="../home"
                className={`text-gray-800 bg-orange-400 rounded-md hover:text-gray-600 px-3 py-2 text-sm font-medium ${
                  activeLink === "../home" ? "font-bold text-orange-500" : ""
                }`}
              >
                Home
              </Link>
              <Link
                href="/events"
                className={`text-gray-800 hover:text-gray-600 px-3 py-2 text-sm font-medium ${
                  activeLink === "/events" ? "font-bold text-orange-500" : ""
                }`}
              >
                Events
              </Link>
              <Link
                href="../Reservation"
                className={`text-gray-800 hover:text-gray-600 px-3 py-2 text-sm font-medium ${
                  activeLink === "/booking" ? "font-bold text-orange-500" : ""
                }`}
              >
                Booking
              </Link>
              <Link
                href="../aboutus"
                className={`text-gray-800 hover:text-gray-600 px-3 py-2 text-sm font-medium ${
                  activeLink === "../aboutus" ? "font-bold text-orange-500" : ""
                }`}
              >
                About Us
              </Link>
              <Link
                href="../Feedback"
                className={`text-gray-800 hover:text-gray-600 px-3 py-2 text-sm font-medium ${
                  activeLink === "../Feedback"
                    ? "font-bold text-orange-500"
                    : ""
                }`}
              >
                Feedback
              </Link>
              <Link href="../login">
                <button className="text-text-gray-800 text-sm hover:white hover:bg-orange-500 rounded-md p-2">
                  Log Out
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
              href="../events"
              className={`text-gray-800 hover:bg-gray-200 block px-3 py-2 rounded-md text-base font-medium ${
                activeLink === "/events" ? "font-bold text-orange-500" : ""
              }`}
            >
              Events
            </Link>
            <Link
              href="../Reservation"
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
          </div>
        </div>
      )}
    </nav>
  );
}

// Hero Section Component
function HeroSection() {
  return (
    <div className="bg-black relative min-h-screen flex items-center justify-center">
      {/* Background Image with Opacity */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-70"
        style={{
          backgroundImage: "url('cafe-hero.png')", // Path to your image
        }}
      ></div>

      {/* Overlay to make sure content is on top */}
      <div className="relative z-10 text-center px-6">
        {/* Centered Text Content */}
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="font-playfair text-7xl font-bold text-white mb-4">
            Where Every Sip Tells a Story
          </h1>
          <p className="font-playfair justify text-2xl text-white mb-8 max-w-3xl">
            Savor the delicate balance of flavors as our skilled baristas pour
            their love into every brew. Complement your drink with our exquisite
            Western pastries or the timeless delight of South Indian banana
            chips, creating a symphony of taste that warms the soul.
          </p>

          {/* Buttons */}
          <div className="flex space-x-4">
            <Link href="/signup">
              <button className="text-white bg-orange-500 hover:bg-orange-600 px-10 py-4 rounded-[7px] text-lg font-medium">
                Events
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Event Card Component
interface EventCardProps {
  date: string;
  title: string;
  description: string;
  image: string;
}

function EventCard({ date, title, description, image }: EventCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg overflow-hidden transition-transform transform hover:scale-105 duration-300 ease-in-out flex flex-col h-full">
      {/* Event Image */}
      <div className="relative cursor-pointer">
        <img src={image} alt={title} className="w-full h-48 object-cover" />

        {/* Event Date Overlay */}
        <div className="absolute top-0 left-0 bg-white text-black px-4 py-2 text-sm font-bold rounded-br-lg shadow-md">
          {date}
        </div>
      </div>

      {/* Event Info */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="text-md font-semibold text-gray-900 mb-2 leading-tight cursor-pointer overflow-hidden overflow-ellipsis whitespace-nowrap max-h-8">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-700 text-sm flex-grow overflow-hidden overflow-ellipsis line-clamp-3">
          {description}
        </p>

        {/* Learn More Button */}
        <div className="mt-4 flex justify-center">
          <Link href="/ShowEvent">
            <button className="text-orange-500 font-semibold text-center bg-transparent border border-white px-4 py-2 rounded-md hover:bg-orange-600 hover:text-white transition duration-300 ease-in-out">
              Book Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-orange-500 text-white py-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {/* Ettarra Coffee House Info */}
          <div className="flex flex-col items-center">
            <h3 className="text-white text-2xl font-bold mb-4">
              Ettarra Coffee House
            </h3>
            <p className="text-sm mb-4">
              At Ettarra, we believe coffee is more than just a drink – it’s an
              experience. Step into our world of rich aromas, cozy atmosphere,
              and artisanal blends that make every visit memorable.
            </p>
            <p className="text-sm">
              &copy; 2024 Ettarra Coffee House. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center">
            <h3 className="text-white text-2xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#about"
                  className="hover:text-white transition duration-300"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#menu"
                  className="hover:text-white transition duration-300"
                >
                  Our Menu
                </a>
              </li>
              <li>
                <a
                  href="#events"
                  className="hover:text-white transition duration-300"
                >
                  Events & Workshops
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-white transition duration-300"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#careers"
                  className="hover:text-white transition duration-300"
                >
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col items-center">
            <h3 className="text-white text-2xl font-bold mb-4">Contact Us</h3>
            <p className="text-sm">123 Coffee Lane, Brewtown, USA</p>
            <p className="text-sm mt-2">Phone: +1 (555) 123-4567</p>
            <p className="text-sm">Email: contact@ettarracoffee.com</p>
            <div className="flex justify-center mt-4 space-x-4">
              <a
                href="https://facebook.com"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                <i className="fab fa-facebook fa-lg"></i>
              </a>
              <a
                href="https://instagram.com"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                <i className="fab fa-instagram fa-lg"></i>
              </a>
              <a
                href="https://twitter.com"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                <i className="fab fa-twitter fa-lg"></i>
              </a>
              <a
                href="https://youtube.com"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                <i className="fab fa-youtube fa-lg"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main Page Component
export default function Page() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <UpcomingEvents />
      <Footer /> {/* Added the Footer here */}
    </>
  );
}
