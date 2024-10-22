"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun, LogOut } from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts"

// Mock data (replace with actual data fetching logic)
const revenueData = [
  { month: "Jan", revenue: 4000 },
  { month: "Feb", revenue: 3000 },
  { month: "Mar", revenue: 5000 },
  { month: "Apr", revenue: 4500 },
  { month: "May", revenue: 6000 },
  { month: "Jun", revenue: 5500 },
]

const averageSpendData = [
  { name: "Food", value: 400 },
  { name: "Drinks", value: 300 },
  { name: "Merchandise", value: 100 },
]

const occupancyData = [
  { date: "Mon", reserved: 80, walkIn: 20 },
  { date: "Tue", reserved: 90, walkIn: 10 },
  { date: "Wed", reserved: 70, walkIn: 30 },
  { date: "Thu", reserved: 85, walkIn: 15 },
  { date: "Fri", reserved: 95, walkIn: 5 },
  { date: "Sat", reserved: 100, walkIn: 0 },
  { date: "Sun", reserved: 75, walkIn: 25 },
]

const inventoryData = [
  { item: "Coffee beans", usage: 100 },
  { item: "Milk", usage: 80 },
  { item: "Sugar", usage: 60 },
  { item: "Cups", usage: 120 },
  { item: "Pastries", usage: 90 },
]

const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40']

export default function ManagerDashboard() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("sales")
  const [selectedDate, setSelectedDate] = useState(new Date())

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const handleLogout = () => {
    // Implement logout logic here
    console.log("Logging out...")
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "sales":
        return (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Revenue Trends</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#FF6384" strokeWidth={2} />
                </LineChart>
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
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {averageSpendData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )
      case "bookings":
        return (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Seat Occupancy</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={occupancyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="reserved" stackId="a" fill="#4BC0C0" />
                  <Bar dataKey="walkIn" stackId="a" fill="#9966FF" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )
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
          </div>
        )
      default:
        return <div>Select a tab to view data</div>
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Etarra Coffee House Supper Club Manager Dashboard</h1>
        <div className="flex items-center gap-4">
          <button
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            <span className="sr-only">Toggle theme</span>
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded"
            onClick={handleLogout}
          >
            <LogOut className="inline-block mr-2 h-4 w-4" /> Logout
          </button>
        </div>
      </div>
      <div className="mb-4">
        <input
          type="date"
          value={selectedDate.toISOString().split('T')[0]}
          onChange={(e) => setSelectedDate(new Date(e.target.value))}
          className="p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <nav className="flex space-x-4">
          {["sales", "bookings", "inventory"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded ${
                activeTab === tab
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>
      {renderTabContent()}
    </div>
  )
}