import { NextApiRequest, NextApiResponse } from "next";

// Mock database or data storage
let bookings = [];

// API route handler for creating a booking
const createBooking = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { userId, eventId, seatsBooked, user, totalPrice } = req.body;

    // Validate required fields
    if (!userId || !eventId || !seatsBooked || !user || !totalPrice) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create a new booking object
    const newBooking = {
      id: `booking-${Date.now()}`, // Generate a unique ID for the booking
      userId,
      eventId,
      seatsBooked,
      user,
      totalPrice,
      createdAt: new Date().toISOString(),
    };

    // Save the booking to the mock database
    bookings.push(newBooking);

    // Return the booking ID as the response
    return res.status(200).json({ id: newBooking.id });
  } else {
    // Handle unsupported request methods
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
};

export default createBooking;
