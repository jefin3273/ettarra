import React from "react";
import Image from "next/image"; // Import Next.js Image component
import Link from "next/link";

const Event1 = () => {
  return (
    <div className="flex flex-col items-center bg-gray-100 p-8">
      {/* Event Image and Overlay Text */}
      <div className="relative w-full h-80 mb-6">
        {" "}
        {/* Set a height of 100px */}
        <Image
          src="/wine2.jpg" // Path to your image in the public folder
          alt="Italian Wine Tasting Night"
          className="rounded-lg shadow-lg object-cover" // Use object-cover here
          fill // Use the fill prop to make the image fill the container
        />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-white bg-black bg-opacity-50">
          <h1 className="text-5xl font-bold text-center text-orange-600">
            Summer Barbeque Extravaganza
          </h1>
          <div className="mt-2 flex items-center justify-center space-x-6">
            <span>Type: Wine Tasting</span>
            <span>Date: 10 Nov 2024</span>
            <span>Time: 5 PM</span>
          </div>
          <Link href="../SeatMap">
            <button className="mt-4 bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition duration-300">
              Book Now
            </button>
          </Link>
        </div>
      </div>

      {/* About the Event */}
      <div className="mt-8 w-full bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-semibold">About the Event</h2>
        <p className="text-gray-700 mt-4">
          Join us for a delightful evening of indulgence at our Italian Wine
          Tasting Night! Experience a curated selection of exquisite Italian
          wines, expertly paired with gourmet appetizers crafted by our talented
          chefs. Immerse yourself in the rich flavors and aromas of Italy's
          finest wines, while our knowledgeable sommelier guides you through the
          tasting experience. You'll learn about the unique characteristics of
          each wine, including the regions they come from and the stories behind
          them. Whether you're a seasoned wine connoisseur or a curious
          newcomer, this event is designed to enhance your appreciation for
          Italian wines. Don't miss the opportunity to savor new flavors, meet
          fellow wine enthusiasts, and create unforgettable memories! This
          exclusive evening will feature a selection of premium Italian wines
          from renowned regions such as Tuscany, Piedmont, and Veneto, carefully
          chosen to provide a diverse tasting experience that showcases the
          depth and variety of Italian winemaking. Throughout the evening,
          you’ll have the opportunity to hear from our special guest speaker, an
          award-winning sommelier who will share insights on wine pairing and
          tasting techniques. Gain valuable knowledge about what makes each wine
          unique, including its flavor profile and how to best enjoy it with
          food. The event will take place at the stunning Ettara, where you can
          enjoy the beautiful ambiance while mingling with fellow wine lovers.
          The venue is conveniently located in the heart of the city, making it
          easily accessible for all guests. As part of the experience, each
          attendee will receive a complimentary wine glass as a memento of the
          evening. You’ll also have the chance to purchase your favorite wines
          at special event prices to take home and enjoy.
        </p>

        <p className="text-gray-700 mt-4 font-bold text-center">
          Spaces are limited, so don’t delay! Secure your ticket today and be
          part of an unforgettable evening celebrating the flavors of Italy.
        </p>
      </div>
    </div>
  );
};

export default Event1;
