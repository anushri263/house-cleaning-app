import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { getProviderById } from '../data/mockData.js'
import { useBooking } from '../context/BookingContext.jsx'

const OTP_LENGTH = 4
const RESEND_COOLDOWN = 30 // seconds

function generateOtp() {
  return String(Math.floor(1000 + Math.random() * 9000))
}

export default function OTPVerification() {
  const { id } = useParams()
  const navigate = useNavigate()
  const provider = getProviderById(id)
  const { bookingDraft, setConfirmedBooking } = useBooking()

  const [sentOtp, setSentOtp] = useState('')
  const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(''))
  const [error, setError] = useState('')
  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN)
  const inputRefs = useRef([])

  
  useEffect(() => {
    if (!bookingDraft) return
    const code = generateOtp()
    setSentOtp(code)
    console.info(`[DEV ONLY] OTP sent to ${bookingDraft.phone}: ${code}`)
  }, [bookingDraft])

  useEffect(() => {
    if (cooldown <= 0) return
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000)
    return () => clearTimeout(timer)
  }, [cooldown])

  if (!provider) {
    return (
      <div className="page">
        <p>Provider not found.</p>
        <Link to="/">← Back to listing</Link>
      </div>
    )
  }

  if (!bookingDraft) {
    return (
      <div className="page">
        <p>No booking in progress. Please start a booking first.</p>
        <Link to={`/service/${provider.id}/book`}>← Go to booking form</Link>
      </div>
    )
  }

  function handleDigitChange(index, value) {
    if (!/^\d?$/.test(value)) return
    const next = [...digits]
    next[index] = value
    setDigits(next)
    setError('')
    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  function handleKeyDown(index, e) {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  function handleResend() {
    if (cooldown > 0) return
  
    const code = generateOtp()
    setSentOtp(code)
    console.info(`[DEV ONLY] OTP resent to ${bookingDraft.phone}: ${code}`)
    setDigits(Array(OTP_LENGTH).fill(''))
    setCooldown(RESEND_COOLDOWN)
    inputRefs.current[0]?.focus()
  }

  function handleVerify(e) {
    e.preventDefault()
    const entered = digits.join('')
    if (entered.length < OTP_LENGTH) {
      setError('Enter the full 4-digit code')
      return
    }

    
    if (entered !== sentOtp) {
      setError('Incorrect code. Please try again.')
      return
    }

   
    const confirmed = {
      ...bookingDraft,
      bookingId: `HC-${Math.floor(100000 + Math.random() * 900000)}`,
      confirmedAt: new Date().toISOString(),
    }
    setConfirmedBooking(confirmed)
    navigate('/confirmation')
  }

  return (
    <div className="page">
      <Link to={`/service/${provider.id}/book`} className="back-link">
        ← Back to booking details
      </Link>

      <div className="card form-card otp-card">
        <h1>Verify your mobile number</h1>
        <p className="tagline">
          We've sent a 4-digit code to <strong>{bookingDraft.phone}</strong>.
        </p>

        <div className="dev-banner">
          Demo mode — no real SMS is sent. Your code is <strong>{sentOtp}</strong>.
        </div>

        <form onSubmit={handleVerify}>
          <div className="otp-inputs">
            {digits.map((digit, i) => (
              <input
                key={i}
                ref={(el) => (inputRefs.current[i] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                className="otp-box"
                value={digit}
                onChange={(e) => handleDigitChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
              />
            ))}
          </div>

          {error && <span className="field-error">{error}</span>}

          <button type="submit" className="btn btn-primary btn-lg">
            Verify &amp; Confirm Booking
          </button>
        </form>

        <button className="btn btn-ghost" onClick={handleResend} disabled={cooldown > 0}>
          {cooldown > 0 ? `Resend code in ${cooldown}s` : 'Resend code'}
        </button>
      </div>
    </div>
  )
}
