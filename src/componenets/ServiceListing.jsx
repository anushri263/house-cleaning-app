import React, { useMemo, useState } from 'react'
import { providers } from '../data/mockData.js'
import ProviderCard from './ProviderCard.jsx'

const SORT_OPTIONS = [
  { value: 'rating', label: 'Highest Rated' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
]

export default function ServiceListing() {
  const [query, setQuery] = useState('')
  const [minRating, setMinRating] = useState(0)
  const [maxPrice, setMaxPrice] = useState(50)
  const [day, setDay] = useState('any')
  const [sortBy, setSortBy] = useState('rating')

  const filtered = useMemo(() => {
    let list = providers.filter((p) => {
      const matchesQuery =
        query.trim() === '' ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.location.toLowerCase().includes(query.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))

      const matchesRating = p.rating >= minRating
      const matchesPrice = p.pricePerHour <= maxPrice
      const matchesDay = day === 'any' || p.availableDays.includes(day)

      return matchesQuery && matchesRating && matchesPrice && matchesDay
    })

    if (sortBy === 'rating') list = [...list].sort((a, b) => b.rating - a.rating)
    if (sortBy === 'price-asc') list = [...list].sort((a, b) => a.pricePerHour - b.pricePerHour)
    if (sortBy === 'price-desc') list = [...list].sort((a, b) => b.pricePerHour - a.pricePerHour)

    return list
  }, [query, minRating, maxPrice, day, sortBy])

  return (
    <div className="page">
      <section className="hero">
        <h1>Book trusted house cleaning, in minutes</h1>
        <p>Compare providers, pick a slot, and confirm with OTP verification.</p>
      </section>

      <section className="filters">
        <input
          type="text"
          className="search-input"
          placeholder="Search by name, area, or service (e.g. 'deep cleaning', 'Panaji')"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div className="filter-row">
          <label>
            Min rating
            <select value={minRating} onChange={(e) => setMinRating(Number(e.target.value))}>
              <option value={0}>Any</option>
              <option value={4}>4.0+</option>
              <option value={4.5}>4.5+</option>
              <option value={4.8}>4.8+</option>
            </select>
          </label>

          <label>
            Max price/hr
            <select value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))}>
              <option value={50}>Any</option>
              <option value={20}>Up to $20</option>
              <option value={30}>Up to $30</option>
              <option value={40}>Up to $40</option>
            </select>
          </label>

          <label>
            Available on
            <select value={day} onChange={(e) => setDay(e.target.value)}>
              <option value="any">Any day</option>
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </label>

          <label>
            Sort by
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <section className="listing-results">
        <p className="results-count">{filtered.length} providers found</p>
        <div className="provider-grid">
          {filtered.map((p) => (
            <ProviderCard key={p.id} provider={p} />
          ))}
          {filtered.length === 0 && <p className="empty-state">No providers match your filters. Try widening them.</p>}
        </div>
      </section>
    </div>
  )
}
