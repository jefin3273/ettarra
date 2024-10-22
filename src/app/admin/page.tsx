// pages/admin.tsx
"use client";
import React, { useState } from "react";

const AdminPage: React.FC = () => {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleScan = async (data: string | null) => {
    if (data) {
      setScanResult(data);
      await verifyBooking(data);
    }
  };

  const handleError = (err: any) => {
    console.error(err);
  };

  const verifyBooking = async (bookingId: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/booking/${bookingId}`);
      if (response.ok) {
        const data = await response.json();
        setBooking(data); // Set the retrieved booking data
      } else {
        console.error("Booking not found");
      }
    } catch (error) {
      console.error("Error verifying booking:", error);
    } finally {
      setLoading(false);
    }
  };

  const approveBooking = async () => {
    if (!booking) return;

    try {
      const response = await fetch(`/api/booking/approve`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: booking.id }),
      });

      if (response.ok) {
        alert("Booking approved successfully!");
        setBooking(null); // Reset booking state
      } else {
        console.error("Failed to approve booking");
      }
    } catch (error) {
      console.error("Error approving booking:", error);
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">Admin Booking Approval</h1>

      {scanResult && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold">
            Scanned Booking ID: {scanResult}
          </h2>
          {loading ? (
            <p>Loading booking details...</p>
          ) : booking ? (
            <div>
              <p>User: {booking.user}</p>
              <p>Event ID: {booking.eventId}</p>
              <p>Seats Booked: {booking.seatsBooked}</p>
              <p>Total Price: ${booking.totalPrice}</p>
              <button
                onClick={approveBooking}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300"
              >
                Approve Booking
              </button>
            </div>
          ) : (
            <p>No booking found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminPage;
