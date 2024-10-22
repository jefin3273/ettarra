// components/HeroSection.tsx
"use client";

import Link from "next/link";

export default function HeroSection() {
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
          <h1 className="font-playfair text-7xl font-bold text-white mb-4 text-border-black">
            Where Every Sip Tells a Story
          </h1>
          <p className="font-playfair justify text-2xl text-white mb-8 max-w-3xl text-border-black">
            Savor the delicate balance of flavors as our skilled baristas pour
            their love into every brew. Complement your drink with our exquisite
            Western pastries or the timeless delight of South Indian banana
            chips, creating a symphony of taste that warms the soul.
          </p>

          {/* Buttons */}
          <div className="flex space-x-4">
            <Link href="../signup">
              <button className="text-white bg-orange-500 hover:bg-orange-600 px-10 py-4 rounded-[7px] text-lg font-medium">
                Join Us
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
