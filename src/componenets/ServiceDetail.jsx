import React from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { getProviderById } from '../data/mockData.js'

export default function ServiceDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const provider = getProviderById(id)

  if (!provider) {
    return (
      <div className="page">
        <p>Provider not found.</p>
        <Link to="/">← Back to listing</Link>
      </div>
    )
  }

  return (
    <div className="page">
      <Link to="/" className="back-link">
        ← Back to results
      </Link>

      <div className="detail-card card">
        <div className="detail-header">
          <div className="avatar avatar-lg">{provider.initials}</div>
          <div>
            <h1>{provider.name}</h1>
            <p className="tagline">{provider.tagline}</p>
            <div className="detail-meta">
              <span className="rating">⭐ {provider.rating.toFixed(1)} ({provider.reviewsCount} reviews)</span>
              <span className="location">📍 {provider.location}</span>
            </div>
          </div>
        </div>

        <div className="tags">
          {provider.tags.map((tag) => (
            <span className="tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>

        <p className="description">{provider.description}</p>

        <div className="pricing-box">
          <h3>Pricing</h3>
          <p className="price-large">${provider.pricePerHour}/hr</p>
          <p className="price-note">Most standard homes take 2–3 hours. Final quote confirmed after booking.</p>
        </div>

        <div className="availability-box">
          <h3>Availability</h3>
          <div className="chip-row">
            {provider.availableDays.map((d) => (
              <span className="chip" key={d}>
                {d}
              </span>
            ))}
          </div>
          <div className="chip-row">
            {provider.slots.map((s) => (
              <span className="chip chip-outline" key={s}>
                {s}
              </span>
            ))}
          </div>
        </div>

        <button className="btn btn-primary btn-lg" onClick={() => navigate(`/service/${provider.id}/book`)}>
          Book Now
        </button>
      </div>
    </div>
  )
}
