import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './componenets/Navbar.jsx'
import ServiceListing from './componenets/ServiceListing.jsx'


export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<ServiceListing />} />
         
          <Route path="*" element={<ServiceListing />} />
        </Routes>
      </main>
    </div>
  )
}
