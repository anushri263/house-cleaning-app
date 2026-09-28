import React, { createContext, useContext, useState } from 'react'

const BookingContext = createContext(null)

export function BookingProvider({ children }) {
  // Draft booking data collected in BookingForm, carried to OTP + confirmation
  const [bookingDraft, setBookingDraft] = useState(null)
  // The final confirmed booking, set after OTP success
  const [confirmedBooking, setConfirmedBooking] = useState(null)

  const value = {
    bookingDraft,
    setBookingDraft,
    confirmedBooking,
    setConfirmedBooking,
  }

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
}

export function useBooking() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error('useBooking must be used within a BookingProvider')
  return ctx
}
