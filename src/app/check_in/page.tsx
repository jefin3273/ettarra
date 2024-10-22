"use client";
import { useState } from "react";
import {
  CheckCircle,
  XCircle,
  Camera,
  UserCheck,
  Search,
  List,
  ChevronDown,
} from "lucide-react";

const events = [
  { id: 1, name: "Jazz Night" },
  { id: 2, name: "Wine Tasting" },
  { id: 3, name: "Poetry Reading" },
];

const guestList = [
  { id: 1, name: "John Doe", email: "john@example.com", checkedIn: false },
  { id: 2, name: "Jane Smith", email: "jane@example.com", checkedIn: true },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", checkedIn: false },
];

const checkInGuest = async (qrData: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return qrData.length % 2 === 0;
};

export default function QRCodeCheckIn() {
  const [scanning, setScanning] = useState(false);
  const [manualCheckIn, setManualCheckIn] = useState("");
  const [checkInStatus, setCheckInStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [checkedInCount, setCheckedInCount] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState(events[0]);
  const [guests, setGuests] = useState(guestList);
  const [showGuestList, setShowGuestList] = useState(false);

  const handleScan = async (data: string | null) => {
    if (data) {
      setScanning(false);
      try {
        const success = await checkInGuest(data);
        if (success) {
          setCheckInStatus("success");
          setCheckedInCount((prev) => prev + 1);
        } else {
          setCheckInStatus("error");
        }
      } catch (error) {
        setCheckInStatus("error");
      }
    }
  };

  const handleError = (err: Error) => {
    console.error(err);
    setCheckInStatus("error");
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4">QR Code Check-In</h1>

      <div className="mb-4">
        <label
          htmlFor="event-select"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Select Event
        </label>
        <div className="relative">
          <select
            id="event-select"
            value={selectedEvent.id}
            onChange={(e) =>
              setSelectedEvent(
                events.find((event) => event.id === Number(e.target.value)) ||
                  events[0]
              )
            }
            className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          >
            {events.map((event) => (
              <option key={event.id} value={event.id}>
                {event.name}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
      </div>

      <div className="mb-4">
        <button
          onClick={() => setScanning((prev) => !prev)}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded flex items-center justify-center"
        >
          <Camera className="mr-2" />
          {scanning ? "Stop Scanning" : "Start Scanning"}
        </button>
      </div>
    </div>
  );
}
