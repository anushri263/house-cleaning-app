import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="brand">
          <span className="brand-icon">🧼</span> SparkleHome
        </Link>
        <button className="btn btn-ghost" onClick={() => navigate('/')}>
          Browse Services
        </button>
      </div>
    </header>
  )
}
