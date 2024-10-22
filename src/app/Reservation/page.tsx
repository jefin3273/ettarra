"use client"
import React, { useState } from 'react'
import { Calendar, Clock, Users, Info, ChevronLeft, ChevronRight, AlertCircle, X } from 'lucide-react'

type Reservation = {
  name: string
  partySize: number
  date: string
  time: string
  table: string
}

const ReservationSystem = () => {
  const [partySize, setPartySize] = useState(1)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [showModal, setShowModal] = useState(false)
  const [modalContent, setModalContent] = useState<{ title: string; message: string }>({ title: '', message: '' })

  const partySizes = [1, 2, 3, 4, 5, 6, 7, 8]
  const times = ['12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00']

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setSelectedTime(null)
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}
    if (!name.trim()) newErrors.name = 'Name is required'
    if (!email.trim()) newErrors.email = 'Email is required'
    if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = 'Invalid email format'
    if (!phone.trim()) newErrors.phone = 'Phone is required'
    if (!/^\d{10}$/.test(phone.replace(/\D/g, ''))) newErrors.phone = 'Invalid phone number'
    if (!selectedDate) newErrors.date = 'Please select a date'
    if (!selectedTime) newErrors.time = 'Please select a time'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleBookReservation = () => {
    if (validateForm()) {
      const newReservation: Reservation = {
        name,
        partySize,
        date: selectedDate!.toISOString().split('T')[0],
        time: selectedTime!,
        table: `Table ${Math.floor(Math.random() * 10) + 1}` // Simulating table assignment
      }

      const isDuplicate = reservations.some(
        res => res.date === newReservation.date && res.time === newReservation.time && res.table === newReservation.table
      )

      if (isDuplicate) {
        setModalContent({
          title: 'Booking Error',
          message: 'This table has already been booked for the selected date and time. Please choose a different time or date.'
        })
      } else {
        setReservations([...reservations, newReservation])
        setModalContent({
          title: 'Booking Confirmed',
          message: `Thank you, ${name}! Your reservation for ${partySize} people on ${newReservation.date} at ${newReservation.time} (${newReservation.table}) has been confirmed.`
        })
        // Reset form
        setPartySize(1)
        setSelectedDate(null)
        setSelectedTime(null)
        setName('')
        setEmail('')
        setPhone('')
      }
      setShowModal(true)
    }
  }

  const isTimeSlotBooked = (time: string) => {
    if (!selectedDate) return false
    const dateKey = selectedDate.toISOString().split('T')[0]
    return reservations.some(res => res.date === dateKey && res.time === time)
  }

  return (
    <div className="min-h-screen bg-orange-100 flex items-center justify-center p-4"> {/* Updated background color */}
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Ettara Coffee Shop Reservation</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Customer Information</h2>
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full p-2 border rounded ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                <input
                  type="tel"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`w-full p-2 border rounded ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Party Size</h2>
              <div className="flex flex-wrap gap-2">
                {partySizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setPartySize(size)}
                    className={`px-4 py-2 rounded ${
                      partySize === size ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Select Date</h2>
              <div className="bg-white border border-gray-300 rounded p-4">
                <div className="flex justify-between items-center mb-4">
                  <button className="text-orange-500"><ChevronLeft /></button>
                  <span className="font-semibold">November 2023</span>
                  <button className="text-orange-500"><ChevronRight /></button>
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                    <button
                      key={day}
                      onClick={() => handleDateSelect(new Date(2023, 10, day))}
                      className={`p-2 rounded ${
                        selectedDate?.getDate() === day ? 'bg-orange-500 text-white' : 'hover:bg-orange-100'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>
              {errors.date && <p className="text-red-500 text-sm mt-2">{errors.date}</p>}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Select Time</h2>
              <div className="grid grid-cols-3 gap-2">
                {times.map(time => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`p-2 rounded ${
                      selectedTime === time ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'
                    } ${isTimeSlotBooked(time) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={!selectedDate || isTimeSlotBooked(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
              {errors.time && <p className="text-red-500 text-sm mt-2">{errors.time}</p>}
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleBookReservation}
            className="px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
          >
            Book Reservation
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">{modalContent.title}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                <X />
              </button>
            </div>
            <p className="text-gray-600">{modalContent.message}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default ReservationSystem
