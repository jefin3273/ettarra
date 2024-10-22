"use client"

import React, { useState } from 'react'
import { AlertCircle } from 'lucide-react'
import { Star } from 'lucide-react'


type Rating = {
  event: number
  ambience: number
  foodQuality: number
}

export default function EventFeedback() {
  const [username, setUsername] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [feedback, setFeedback] = useState('')
  const [ratings, setRatings] = useState<Rating>({ event: 0, ambience: 0, foodQuality: 0 })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleRatingChange = (category: keyof Rating, value: number) => {
    setRatings(prev => ({ ...prev, [category]: value }))
  }

  const handleSubmit = () => {
    if (!username.trim()) {
      setError('Please enter your username')
      return
    }
    
    if (!phoneNumber.trim()) {
      setError('Please enter your phone number')
      return
    }

    if (!feedback.trim()) {
      setError('Please provide your feedback')
      return
    }

    const unratedCategories = Object.entries(ratings)
      .filter(([_, value]) => value === 0)
      .map(([key, _]) => key)

    if (unratedCategories.length > 0) {
      setError(`Please rate the following categories: ${unratedCategories.join(', ')}`)
      return
    }

    // Here you would typically send the data to your database
    console.log('Submitting feedback:', { username, phoneNumber, feedback, ...ratings })
    setSubmitted(true)
    setError(null)
  }

  const renderStars = (category: keyof Rating) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-6 h-6 cursor-pointer ${
              star <= ratings[category] ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
            }`}
            onClick={() => handleRatingChange(category, star)}
          />
        ))}
      </div>
    )
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{ backgroundImage: "url('/feedback.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* Overlay to darken the background */}
      <div className="absolute inset-0 bg-black opacity-50"></div> {/* Dark overlay */}
      
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full bg-opacity-90 relative z-10">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Event Feedback</h1>
        
        {!submitted ? (
          <>
            <div className="mb-6">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Your Name
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Enter your name"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Enter your phone number"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-1">
                Feedback
              </label>
              <textarea
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Provide your feedback here..."
              />
            </div>

            <div className="space-y-6 mb-8">
              {Object.entries(ratings).map(([category, value]) => (
                <div key={category} className="flex flex-col space-y-2">
                  <label className="text-lg font-semibold capitalize text-gray-700">{category}</label>
                  {renderStars(category as keyof Rating)}
                </div>
              ))}
            </div>

            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 flex items-center">
                <AlertCircle className="w-5 h-5 mr-2" />
                <p>{error}</p>
              </div>
            )}

            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-orange-400 to-orange-600 text-white font-bold py-3 px-4 rounded-lg hover:from-orange-500 hover:to-orange-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 mt-4"
            >
              Submit Feedback
            </button>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-green-600 mb-4">{username}, your feedback is valuable to us!</h2>
            <p className="text-gray-600">Thank you for taking the time to rate our event.</p>
          </div>
        )}
      </div>
    </div>
  )
}
