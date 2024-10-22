import React from "react";
import Link from "next/link";
const eventsData = [
  {
    title: "Wine Tasting",
    image: "/event1.png",
    description: "Join us for an exclusive wine tasting experience.",
    date: "Oct 20, 2024", // Added event date
    moreDetails:
      "Indulge in a delightful journey through the world of wine at our upcoming Wine Tasting event, a perfect complement to our food festival. Discover the art of wine appreciation and learn how to enhance your culinary experiences with carefully selected wines.",
  },
  {
    title: "Cheese Pairing Class",
    image: "/event2.png",
    description: "Learn the art of pairing cheese with different wines.",
    date: "Oct 22, 2024",
    moreDetails: "Master the perfect combinations for your next gathering.",
  },
  {
    title: "Gourmet Cooking Class",
    image: "/event3.png",
    description: "Discover new gourmet recipes with our expert chefs.",
    date: "Oct 25, 2024",
    moreDetails: "Cook alongside professionals and enjoy your creations.",
  },
  {
    title: "Chocolate Tasting",
    image: "/event4.png",
    description: "Experience the delightful world of chocolate.",
    date: "Oct 27, 2024",
    moreDetails: "Taste various types of chocolate from around the world.",
  },
  {
    title: "Craft Beer Festival",
    image: "/event5.png",
    description:
      "Enjoy a day filled with craft beer tastings and food pairings.",
    date: "Oct 29, 2024",
    moreDetails: "Sample local brews and enjoy food from top vendors.",
  },
  {
    title: "Farm-to-Table Dinner",
    image: "/event6.png",
    description: "Savor a delicious meal made from local ingredients.",
    date: "Nov 2, 2024",
    moreDetails: "Indulge in a meal sourced directly from local farms.",
  },
  {
    title: "Baking Workshop",
    image: "/event7.png",
    description: "Learn the secrets of baking from professional bakers.",
    date: "Nov 5, 2024",
    moreDetails: "Create delicious pastries and bread from scratch.",
  },
  {
    title: "Street Food Festival",
    image: "/event8.png",
    description: "Taste delicious street food from around the world.",
    date: "Nov 10, 2024",
    moreDetails: "Experience diverse cuisines in one exciting location.",
  },
  {
    title: "Sushi Making Class",
    image: "/event9.png",
    description: "Master the art of sushi making with our hands-on class.",
    date: "Nov 15, 2024",
    moreDetails: "Learn techniques to create beautiful sushi rolls.",
  },
];

const Events = () => {
  return (
    <div className="py-10 px-4 w-full mx-auto bg-orange-100">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Food Events Happening Now!!
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {eventsData.map((event, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden relative transition-transform transform hover:scale-105"
          >
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-48 object-cover"
            />
            <div className="absolute top-2 left-2 bg-white text-gray-800 text-sm font-semibold px-2 rounded">
              {event.date} {/* Display event date */}
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 text-center">
                {event.title}
              </h2>
              <p className="mt-2 text-gray-600">{event.description}</p>
            </div>
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white text-center opacity-0 hover:opacity-100 transition-opacity">
              <p className="p-2">{event.moreDetails}</p>
              <Link href="../Reservation">
                <button className="mt-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition duration-300">
                  Join Now
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
