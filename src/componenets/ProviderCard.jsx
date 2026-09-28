import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function ProviderCard({ provider }) {
  const navigate = useNavigate()

  return (
    <div className="card provider-card" onClick={() => navigate(`/service/${provider.id}`)}>
      <div className="avatar">{provider.initials}</div>
      <div className="provider-card-body">
        <div className="provider-card-header">
          <h3>{provider.name}</h3>
          <span className="rating">⭐ {provider.rating.toFixed(1)}</span>
        </div>
        <p className="tagline">{provider.tagline}</p>
        <div className="tags">
          {provider.tags.map((tag) => (
            <span className="tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
        <div className="provider-card-footer">
          <span className="price">${provider.pricePerHour}/hr</span>
          <span className="location">📍 {provider.location}</span>
          <span className="reviews">{provider.reviewsCount} reviews</span>
        </div>
      </div>
      <button className="btn btn-primary" onClick={() => navigate(`/service/${provider.id}`)}>
        View Details
      </button>
    </div>
  )
}
