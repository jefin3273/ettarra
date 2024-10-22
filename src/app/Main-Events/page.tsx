// main-events.tsx
"use client";
import React, { Key, useEffect, useState } from "react";
import Link from "next/link";

interface EventCardProps {
  id: Key | null | undefined;
  date: string;
  title: string;
  description: string;
  image: string;
  price: number;
  chefDetails: string;
  seatsAvailable: number;
  totalSeats: number;
}

function EventCard({
  date,
  title,
  description,
  image,
  price,
  chefDetails,
  seatsAvailable,
  totalSeats,
}: EventCardProps) {
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
        <div className="flex justify-between items-center">
          {/* Move Title Below or to the Right */}
          <div className="w-full">
            {/* Title (Adjust its positioning as per the design you want) */}
            <h3 className="text-md font-semibold text-gray-900 mb-2 leading-tight cursor-pointer overflow-hidden overflow-ellipsis whitespace-nowrap max-h-8">
              {title}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-700 text-sm flex-grow overflow-hidden overflow-ellipsis line-clamp-3">
          {description}
        </p>

        {/* Additional Event Details */}
        <p className="text-gray-700 text-sm mt-2">Chef: {chefDetails}</p>
        <p className="text-gray-700 text-sm mt-2">Price: ₹{price.toFixed(2)}</p>
        <p className="text-gray-700 text-sm mt-2">
          Seats Available: {seatsAvailable}/{totalSeats}
        </p>

        {/* Book Now Button */}
        <div className="mt-4 flex justify-center">
          <Link href="../ShowEvent">
            <button className="text-orange-500 font-semibold text-center bg-transparent border border-white px-4 py-2 rounded-md hover:bg-orange-600 hover:text-white transition duration-300 ease-in-out">
              Book Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function UpcomingEvents() {
  const [events, setEvents] = useState<EventCardProps[]>([]);

  useEffect(() => {
    // Fetch events from API
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/event_user/route");
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div
      className="w-full flex justify-center bg-cover bg-center relative"
      style={{
        backgroundColor: "#FFDAB9", // Correct background color
        padding: "50px 0", // Add padding for top and bottom
      }}
    >
      <div className="absolute inset-0 bg-black opacity-30"></div>

      <div className="relative max-w-[1180px] w-full px-6 z-10">
        <h2 className="text-5xl text-center text-white bg-clip-text text-transparent font-bold  mb-10">
          Upcoming Events
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <EventCard
              key={event.id}
              date={new Date(event.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
              title={event.title}
              description={event.description}
              image={`/1.jpg`} // Dynamically set image path based on event.id
              price={event.price}
              chefDetails={event.chefDetails}
              seatsAvailable={event.seatsAvailable}
              totalSeats={event.totalSeats}
              id={event.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
