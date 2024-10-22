"use client"; // Client Component
import React, { useState } from "react";

// Define a type for the chair
interface Chair {
  id: string;
  isSelected: boolean;
}

// Define a type for the table with chairs
interface Table {
  id: string;
  chairs: Chair[];
}

// Initial table and chair setup
const initialTables: Table[] = [
  {
    id: "Table 1",
    chairs: [
      { id: "A1", isSelected: false },
      { id: "A2", isSelected: false },
      { id: "A3", isSelected: false },
      { id: "A4", isSelected: false },
      { id: "A5", isSelected: false },
      { id: "A6", isSelected: false },
    ],
  },
  {
    id: "Table 2",
    chairs: [
      { id: "B1", isSelected: false },
      { id: "B2", isSelected: false },
      { id: "B3", isSelected: false },
      { id: "B4", isSelected: false },
      { id: "B5", isSelected: false },
      { id: "B6", isSelected: false },
    ],
  },
  {
    id: "Table 3",
    chairs: [
      { id: "C1", isSelected: false },
      { id: "C2", isSelected: false },
      { id: "C3", isSelected: false },
      { id: "C4", isSelected: false },
      { id: "C5", isSelected: false },
      { id: "C6", isSelected: false },
    ],
  },
  {
    id: "Table 4",
    chairs: [
      { id: "D1", isSelected: false },
      { id: "D2", isSelected: false },
      { id: "D3", isSelected: false },
      { id: "D4", isSelected: false },
      { id: "D5", isSelected: false },
      { id: "D6", isSelected: false },
    ],
  },
  {
    id: "Table 5",
    chairs: [
      { id: "E1", isSelected: false },
      { id: "E2", isSelected: false },
      { id: "E3", isSelected: false },
      { id: "E4", isSelected: false },
      { id: "E5", isSelected: false },
      { id: "E6", isSelected: false },
    ],
  },
  {
    id: "Table 6",
    chairs: [
      { id: "F1", isSelected: false },
      { id: "F2", isSelected: false },
      { id: "F3", isSelected: false },
      { id: "F4", isSelected: false },
      { id: "F5", isSelected: false },
      { id: "F6", isSelected: false },
    ],
  },
  {
    id: "Table 7",
    chairs: [
      { id: "G1", isSelected: false },
      { id: "G2", isSelected: false },
      { id: "G3", isSelected: false },
      { id: "G4", isSelected: false },
      { id: "G5", isSelected: false },
      { id: "G6", isSelected: false },
    ],
  },
  {
    id: "Table 8",
    chairs: [
      { id: "H1", isSelected: false },
      { id: "H2", isSelected: false },
      { id: "H3", isSelected: false },
      { id: "H4", isSelected: false },
      { id: "H5", isSelected: false },
      { id: "H6", isSelected: false },
    ],
  },
];

const SeatMap: React.FC = () => {
  const [tables, setTables] = useState<Table[]>(initialTables);
  const [selectedTableId, setSelectedTableId] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState({
    name: "",
    contact: "",
    email: "",
  });

  // Function to handle table selection and select all chairs
  const selectAllChairs = (tableId: string) => {
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.id === tableId
          ? {
              ...table,
              chairs: table.chairs.map((chair) => ({
                ...chair,
                isSelected: true,
              })),
            }
          : {
              ...table,
              chairs: table.chairs.map((chair) => ({
                ...chair,
                isSelected: false,
              })),
            }
      )
    );
    setSelectedTableId(tableId); // Set selected table
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAppointmentDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleProceed = () => {
    // Handle proceed logic here
    console.log("Proceeding with:", appointmentDetails);
    setShowPopup(false); // Close popup after proceeding
  };

  const handleCancel = () => {
    setShowPopup(false); // Close the popup when cancelled
  };

  return (
    <div className="p-10 bg-white">
      {/* Event Header */}
      <div className="text-center mb-14">
        <h1 className="text-4xl font-bold mb-2 text-red-600">
          Italian Wine Tasting Night
        </h1>
        <h2 className="text-2xl font-semibold text-gray-700">
          Join us for an exquisite evening of wine tasting!
        </h2>
      </div>

      {/* Table and Chairs Layout */}
      <div className="grid grid-cols-4 gap-24">
        {tables.map((table) => (
          <div
            key={table.id}
            className="relative flex flex-col items-center mb-10"
          >
            <div
              onClick={() => selectAllChairs(table.id)}
              className="border border-gray-600 rounded-full w-36 h-36 flex items-center justify-center mb-6 cursor-pointer bg-white shadow-lg hover:bg-gray-100 transition duration-300"
            >
              <span className="font-bold text-lg">{table.id}</span>
            </div>
            <div className="absolute inset-0 flex justify-center items-center">
              {table.chairs.map((chair, chairIndex) => (
                <button
                  key={chair.id}
                  onClick={() => selectAllChairs(table.id)} // Clicking chair also selects table
                  className={`border rounded-full w-12 h-12 flex items-center justify-center absolute transition duration-300 ease-in-out ${
                    chair.isSelected
                      ? "bg-green-500 text-white"
                      : "bg-white text-black"
                  }`}
                  style={{
                    transform: `rotate(${
                      (chairIndex * 360) / table.chairs.length
                    }deg) translate(120px) rotate(-${
                      (chairIndex * 360) / table.chairs.length
                    }deg)`,
                  }}
                >
                  {chair.id}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* Book Appointment Button */}
      {selectedTableId && (
        <div className="text-center mt-8">
          <h3 className="text-black text-lg font-semibold mb-2">
            You have selected {selectedTableId}
          </h3>
          <button
            onClick={() => setShowPopup(true)}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
          >
            Book Appointment
          </button>
        </div>
      )}

      {/* Appointment Details Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Appointment Details</h3>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={appointmentDetails.name}
              onChange={handleInputChange}
              className="border border-gray-300 rounded w-full p-2 mb-4"
            />
            <input
              type="text"
              name="contact"
              placeholder="Contact"
              value={appointmentDetails.contact}
              onChange={handleInputChange}
              className="border border-gray-300 rounded w-full p-2 mb-4"
            />
            <input
              type="email"
              name="email"
              placeholder="Email ID"
              value={appointmentDetails.email}
              onChange={handleInputChange}
              className="border border-gray-300 rounded w-full p-2 mb-4"
            />
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleProceed}
                className="bg-red-600 text-white rounded px-4 py-2"
              >
                Proceed to Pay
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-400 text-white rounded px-4 py-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeatMap;
