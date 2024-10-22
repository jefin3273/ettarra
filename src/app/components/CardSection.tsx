import React from "react";
import Image from "next/image";
const CardSection = () => {
  return (
    <div className="flex flex-wrap cursor-pointer justify-around items-start py-12 gap-6">
      {/* Card 1 */}
      <div className="bg-gray-100 shadow-lg rounded-lg relative overflow-hidden max-w-sm transform transition-transform duration-300 hover:scale-105 hover:bg-gray-600">
        <h2 className="text-2xl font-semibold mb-4 text-center">Our Mission</h2>
        <div className="h-56">
          <Image
            src="/food1.jpg"
            alt="Our Mission"
            width={700}
            height={200}
            layout="responsive"
            objectFit="cover"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 opacity-0 transition-opacity duration-300 hover:opacity-100">
          <p className="text-white text-lg font-bold text-center p-4">
            We are dedicated to fostering a spirit of community and compassion
            through volunteerism. Our mission is to connect individuals with
            meaningful opportunities that inspire action and create lasting
            change.
          </p>
        </div>
      </div>

      {/* Card 2 */}
      <div className="bg-gray-100 cursor-pointer shadow-lg rounded-lg relative overflow-hidden max-w-sm transform transition-transform duration-300 hover:scale-105 hover:bg-gray-600">
        <h2 className="text-2xl font-semibold mb-4 text-center">Our Team</h2>
        <div className="h-56">
          <Image
            src="/food2.jpg"
            alt="Our Team"
            width={700}
            height={200}
            layout="responsive"
            objectFit="cover"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 opacity-0 transition-opacity duration-300 hover:opacity-100">
          <p className="text-white text-lg font-bold text-center p-4">
            Our team is a diverse group of passionate individuals committed to
            making a difference in our community. Each member brings unique
            skills and experiences, united by a shared dedication to service.
          </p>
        </div>
      </div>

      {/* Card 3 */}
      <div className="bg-gray-100 cursor-pointer shadow-lg rounded-lg relative overflow-hidden max-w-sm transform transition-transform duration-300 hover:scale-105 hover:bg-gray-600">
        <h2 className="text-2xl font-semibold mb-4 text-center">Our Vision</h2>
        <div className="h-56">
          <Image
            src="/food3.jpg"
            alt="Our Vision"
            width={700}
            height={200}
            layout="responsive"
            objectFit="cover"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 opacity-0 transition-opacity duration-300 hover:opacity-100">
          <p className="text-white text-lg font-bold text-center p-4">
            We envision a world where everyone can contribute their time and
            talents to uplift their communities. Our goal is to inspire action,
            foster connections among diverse groups, and empower communities to
            thrive together.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardSection;
