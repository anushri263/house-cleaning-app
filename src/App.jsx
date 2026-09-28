import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './componenets/Navbar.jsx'
import ServiceListing from './componenets/ServiceListing.jsx'
import ServiceDetail from './componenets/ServiceDetail.jsx'
import { BookingProvider } from './context/BookingContext.jsx'
import BookingForm from './componenets/BookingForm.jsx'


export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<ServiceListing />} />
           <Route path="/service/:id" element={<ServiceDetail />} />
           <Route path="/service/:id/book" element={<BookingForm />} />
          <Route path="*" element={<ServiceListing />} />
        </Routes>
      </main>
    </div>
  )
}
