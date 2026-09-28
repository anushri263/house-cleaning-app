import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useBooking } from '../context/BookingContext.jsx'

export default function BookingConfirmation() {
  const { confirmedBooking, setBookingDraft, setConfirmedBooking } = useBooking()
  const navigate = useNavigate()

  if (!confirmedBooking) {
    return (
      <div className="page">
        <p>No confirmed booking found.</p>
        <Link to="/">← Back to listing</Link>
      </div>
    )
  }

  function startNewBooking() {
    setBookingDraft(null)
    setConfirmedBooking(null)
    navigate('/')
  }

  return (
    <div className="page">
      <div className="card confirmation-card">
        <div className="success-icon">✅</div>
        <h1>Booking Confirmed!</h1>
        <p className="tagline">Your cleaning is scheduled. A confirmation has been sent to your phone.</p>

        <div className="confirmation-details">
          <div className="detail-row">
            <span>Booking ID</span>
            <strong>{confirmedBooking.bookingId}</strong>
          </div>
          <div className="detail-row">
            <span>Provider</span>
            <strong>{confirmedBooking.providerName}</strong>
          </div>
          <div className="detail-row">
            <span>Date</span>
            <strong>{confirmedBooking.date}</strong>
          </div>
          <div className="detail-row">
            <span>Time slot</span>
            <strong>{confirmedBooking.slot}</strong>
          </div>
          <div className="detail-row">
            <span>Address</span>
            <strong>
              {confirmedBooking.address}, {confirmedBooking.city}
            </strong>
          </div>
          <div className="detail-row">
            <span>Mobile</span>
            <strong>{confirmedBooking.phone}</strong>
          </div>
          <div className="detail-row">
            <span>Rate</span>
            <strong>${confirmedBooking.pricePerHour}/hr</strong>
          </div>
        </div>

        <button className="btn btn-primary btn-lg" onClick={startNewBooking}>
          Book Another Service
        </button>
      </div>
    </div>
  )
}
