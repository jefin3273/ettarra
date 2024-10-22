"use client";

import React, { useState, useEffect, ReactNode } from "react";
import { Moon, Sun, LogOut, Plus } from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Mock data (replace with actual data fetching logic)
const revenueData = [
  { month: "Jan", revenue: 4000 },
  { month: "Feb", revenue: 3000 },
  { month: "Mar", revenue: 5000 },
  { month: "Apr", revenue: 4500 },
  { month: "May", revenue: 6000 },
  { month: "Jun", revenue: 5500 },
];

const averageSpendData = [
  { name: "Food", value: 400 },
  { name: "Drinks", value: 300 },
  { name: "Merchandise", value: 100 },
];

const attendanceData = [
  { frequency: "First-time", count: 200 },
  { frequency: "Occasional", count: 300 },
  { frequency: "Regular", count: 150 },
  { frequency: "VIP", count: 50 },
];

const occupancyData = [
  { date: "Mon", reserved: 80, walkIn: 20 },
  { date: "Tue", reserved: 90, walkIn: 10 },
  { date: "Wed", reserved: 70, walkIn: 30 },
  { date: "Thu", reserved: 85, walkIn: 15 },
  { date: "Fri", reserved: 95, walkIn: 5 },
  { date: "Sat", reserved: 100, walkIn: 0 },
  { date: "Sun", reserved: 75, walkIn: 25 },
];

const inventoryData = [
  { item: "Coffee beans", usage: 100 },
  { item: "Milk", usage: 80 },
  { item: "Sugar", usage: 60 },
  { item: "Cups", usage: 120 },
  { item: "Pastries", usage: 90 },
];

const eventPerformanceData = [
  { event: "Jazz Night", attendance: 95, revenue: 5000 },
  { event: "Wine Tasting", attendance: 80, revenue: 4000 },
  { event: "Poetry Reading", attendance: 60, revenue: 2000 },
  { event: "Comedy Show", attendance: 90, revenue: 4500 },
  { event: "Art Exhibition", attendance: 70, revenue: 3000 },
];

const operationalEfficiencyData = [
  { date: "Mon", staffEfficiency: 85, checkInTime: 2 },
  { date: "Tue", staffEfficiency: 90, checkInTime: 1.5 },
  { date: "Wed", staffEfficiency: 88, checkInTime: 1.8 },
  { date: "Thu", staffEfficiency: 92, checkInTime: 1.3 },
  { date: "Fri", staffEfficiency: 95, checkInTime: 1 },
  { date: "Sat", staffEfficiency: 93, checkInTime: 1.2 },
  { date: "Sun", staffEfficiency: 87, checkInTime: 1.7 },
];

const COLORS = [
  "#FF6384",
  "#36A2EB",
  "#FFCE56",
  "#4BC0C0",
  "#9966FF",
  "#FF9F40",
];

interface Booking {
  userId: string;
  eventId: string;
  id: string;
  event?: { title: string };
  user?: { name: string };
  seatsBooked: number;
  totalPrice: number;
  status: string;
  createdAt: string;
}

interface Toast {
  message: string;
  type: string;
}

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  chefDetails: string;
  price: number;
  totalSeats: number;
  bookedSeats: number;
}

interface NewEvent {
  title: string;
  description: string;
  date: string;
  chefDetails: string;
  price: string;
  totalSeats: string;
}

export default function AdminDashboard() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("sales");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    chefDetails: "",
    price: "",
    totalSeats: "",
  });
  const [toast, setToast] = useState<Toast | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    setMounted(true);
    fetchBookings();
    fetchEvents();
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const fetchBookings = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/bookings/route");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setError("Failed to fetch bookings. Please try again later.");
      showToast("Error fetching bookings", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchEvents = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/events_admin/route");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError("Oops, we haven't got JSON!");
      }
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
      setError("Failed to fetch events. Please try again later.");
      showToast("Error fetching events", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("/api/events_admin/route", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newEvent,
          price: parseFloat(newEvent.price),
          totalSeats: parseInt(newEvent.totalSeats),
          createdBy: "admin",
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`
        );
      }
      const createdEvent = await response.json();
      showToast("Event created successfully", "success");
      fetchEvents();
      setNewEvent({
        title: "",
        description: "",
        date: "",
        chefDetails: "",
        price: "",
        totalSeats: "",
      });
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error creating event:", error);
      showToast(
        error instanceof Error ? error.message : "Error creating event",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const showToast = (message: string, type = "info") => {
    setToast({ message, type });
  };

  const handleLogout = () => {
    window.location.href = "..";
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  const cancelBooking = async (bookingId: string) => {
    try {
      const res = await fetch("/api/bookings/cancel/route", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookingId }),
      });
      if (res.ok) {
        showToast("Booking cancelled successfully!", "success");
        fetchBookings(); // Reload bookings
      } else {
        showToast("Failed to cancel booking.", "error");
      }
    } catch (error) {
      console.error("Error cancelling booking:", error);
      showToast("An error occurred while cancelling the booking.", "error");
    }
  };

  const updateBookingStatus = async (bookingId: string, newStatus: string) => {
    try {
      const res = await fetch("/api/bookings/updateStatus/route", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookingId, newStatus }),
      });
      if (res.ok) {
        showToast(`Booking status updated to ${newStatus}`, "success");
        fetchBookings(); // Reload bookings
      } else {
        showToast("Failed to update booking status.", "error");
      }
    } catch (error) {
      console.error("Error updating booking status:", error);
      showToast(
        "An error occurred while updating the booking status.",
        "error"
      );
    }
  };

  const renderTabContent = () => {
    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      );
    }
    switch (activeTab) {
      case "sales":
        return (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Revenue Trends</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#FF6384"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Revenue Breakdown</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="#36A2EB" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Average Spend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={averageSpendData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
                    }
                  >
                    {averageSpendData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      case "customers":
        return (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">
                Attendance Frequency
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="frequency" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#FFCE56" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">
                Customer Demographics
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={attendanceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                    label={({ frequency, percent }) =>
                      `${frequency} ${((percent ?? 0) * 100).toFixed(0)}%`
                    }
                  >
                    {attendanceData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      case "bookings":
        return (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {bookings.map((booking) => (
              <Card key={booking.id}>
                <CardHeader>
                  <CardTitle>Booking {booking.id}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Event: {booking.eventId}</p>
                  <p>User: {booking.userId}</p>
                  <p>Seats Booked: {booking.seatsBooked}</p>
                  <p>Total Price: ₹{booking.totalPrice}</p>
                  <p>Status: {booking.status}</p>
                  <p>
                    Created At: {new Date(booking.createdAt).toLocaleString()}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => cancelBooking(booking.eventId)}
                    variant="destructive"
                    disabled={booking.status === "cancelled"}
                  >
                    Cancel
                  </Button>
                  {booking.status === "pending" && (
                    <Button
                      onClick={() =>
                        updateBookingStatus(booking.eventId, "confirmed")
                      }
                      variant="default"
                      className="ml-2"
                    >
                      Confirm
                    </Button>
                  )}
                  {booking.status === "confirmed" && (
                    <Button
                      onClick={() =>
                        updateBookingStatus(booking.eventId, "waitlist")
                      }
                      variant="secondary"
                      className="ml-2"
                    >
                      Waitlist
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        );
      case "inventory":
        return (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Inventory Usage</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={inventoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="item" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="usage" fill="#FF9F40" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">
                Supplier Performance
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <ScatterChart>
                  <CartesianGrid />
                  <XAxis
                    type="number"
                    dataKey="x"
                    name="Delivery Time"
                    unit="days"
                  />
                  <YAxis
                    type="number"
                    dataKey="y"
                    name="Quality Score"
                    unit="%"
                  />
                  <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                  <Scatter
                    name="Suppliers"
                    data={[
                      { x: 3, y: 90 },
                      { x: 2, y: 95 },
                      { x: 4, y: 85 },
                      { x: 1, y: 98 },
                      { x: 5, y: 80 },
                    ]}
                    fill="#FF6384"
                  />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      case "events":
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Events</h2>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" /> Create Event
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Event</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleCreateEvent} className="space-y-4">
                    <Input
                      placeholder="Event Title"
                      value={newEvent.title}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, title: e.target.value })
                      }
                      required
                    />
                    <Textarea
                      placeholder="Event Description"
                      value={newEvent.description}
                      onChange={(e) =>
                        setNewEvent({
                          ...newEvent,
                          description: e.target.value,
                        })
                      }
                      required
                    />
                    <Input
                      type="date"
                      value={newEvent.date}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, date: e.target.value })
                      }
                      required
                    />
                    <Input
                      placeholder="Chef Details"
                      value={newEvent.chefDetails}
                      onChange={(e) =>
                        setNewEvent({
                          ...newEvent,
                          chefDetails: e.target.value,
                        })
                      }
                      required
                    />
                    <Input
                      type="number"
                      placeholder="Price"
                      value={newEvent.price}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, price: e.target.value })
                      }
                      required
                    />
                    <Input
                      type="number"
                      placeholder="Total Seats"
                      value={newEvent.totalSeats}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, totalSeats: e.target.value })
                      }
                      required
                    />
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Creating..." : "Create Event"}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <Card key={event.id}>
                  <CardHeader>
                    <CardTitle>{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{event.description}</p>
                    <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                    <p>Chef: {event.chefDetails}</p>
                    <p>Price: ₹{event.price}</p>
                    <p>
                      Available Seats: ({event.totalSeats}-{event.bookedSeats})/
                      {event.totalSeats}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      case "operations":
        return (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">
                Operational Efficiency
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={operationalEfficiencyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" orientation="left" stroke="#9966FF" />
                  <YAxis yAxisId="right" orientation="right" stroke="#FF9F40" />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="staffEfficiency"
                    stroke="#9966FF"
                    strokeWidth={2}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="checkInTime"
                    stroke="#FF9F40"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">
                Post-Event Analysis
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={eventPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="event" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="attendance" fill="#FF6384" />
                  <Bar dataKey="revenue" fill="#36A2EB" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      default:
        return <div>Select a tab to view data</div>;
    }
  };

  return (
    <div className={`container mx-auto p-4 ${theme === "dark" ? "dark" : ""}`}>
      {toast && (
        <Alert
          variant={toast.type === "error" ? "destructive" : "default"}
          className="mb-4"
        >
          <AlertDescription>{toast.message}</AlertDescription>
        </Alert>
      )}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Ettara Coffee House Supper Club Admin Dashboard
        </h1>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={toggleTheme}>
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Button variant="destructive" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>
      </div>
      <div className="mb-4">
        <Input
          type="date"
          value={selectedDate.toISOString().split("T")[0]}
          onChange={(e) => setSelectedDate(new Date(e.target.value))}
        />
      </div>
      <div className="mb-4">
        <nav className="flex space-x-2">
          {[
            "sales",
            "customers",
            "bookings",
            "inventory",
            "events",
            "operations",
          ].map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? "default" : "outline"}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Button>
          ))}
        </nav>
      </div>
      {renderTabContent()}
    </div>
  );
}
function setIsDialogOpen(arg0: boolean) {
  throw new Error("Function not implemented.");
}
