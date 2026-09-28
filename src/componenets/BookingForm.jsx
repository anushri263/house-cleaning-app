import React, { useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { getProviderById } from '../data/mockData.js'
import { useBooking } from '../context/BookingContext.jsx'

export default function BookingForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const provider = getProviderById(id)
  const { setBookingDraft } = useBooking()

  const [form, setForm] = useState({
    date: '',
    slot: provider?.slots?.[0] || '',
    address: '',
    city: provider?.location || '',
    phone: '',
    notes: '',
  })
  const [errors, setErrors] = useState({})

  if (!provider) {
    return (
      <div className="page">
        <p>Provider not found.</p>
        <Link to="/">← Back to listing</Link>
      </div>
    )
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  function validate() {
    const errs = {}
    if (!form.date) errs.date = 'Please select a date'
    if (!form.slot) errs.slot = 'Please select a time slot'
    if (!form.address.trim()) errs.address = 'Address is required'
    // Simple 10-digit phone check — adjust to your locale's format
    if (!/^\d{10}$/.test(form.phone.replace(/\D/g, ''))) {
      errs.phone = 'Enter a valid 10-digit mobile number'
    }
    return errs
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    
    setBookingDraft({
      providerId: provider.id,
      providerName: provider.name,
      pricePerHour: provider.pricePerHour,
      ...form,
    })

    navigate(`/service/${provider.id}/verify`)
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="page">
      <Link to={`/service/${provider.id}`} className="back-link">
        ← Back to {provider.name}
      </Link>

      <div className="card form-card">
        <h1>Book {provider.name}</h1>
        <p className="tagline">Fill in your booking details. We'll verify your mobile number next.</p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input id="date" type="date" name="date" min={today} value={form.date} onChange={handleChange} />
            {errors.date && <span className="field-error">{errors.date}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="slot">Time slot</label>
            <select id="slot" name="slot" value={form.slot} onChange={handleChange}>
              {provider.slots.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            {errors.slot && <span className="field-error">{errors.slot}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="address">Street address</label>
            <input
              id="address"
              type="text"
              name="address"
              placeholder="House / Flat No., Street, Landmark"
              value={form.address}
              onChange={handleChange}
            />
            {errors.address && <span className="field-error">{errors.address}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="city">City / Area</label>
            <input id="city" type="text" name="city" value={form.city} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Mobile number</label>
            <input
              id="phone"
              type="tel"
              name="phone"
              placeholder="10-digit mobile number"
              value={form.phone}
              onChange={handleChange}
            />
            {errors.phone && <span className="field-error">{errors.phone}</span>}
            <span className="field-hint">We'll send a one-time code to verify this number.</span>
          </div>

          <div className="form-group">
            <label htmlFor="notes">Special instructions (optional)</label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              placeholder="E.g. gate code, pets in the house, areas to focus on"
              value={form.notes}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary btn-lg">
            Continue to Verification
          </button>
        </form>
      </div>
    </div>
  )
}
