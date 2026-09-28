import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './componenets/Navbar.jsx'
import ServiceListing from './componenets/ServiceListing.jsx'
import ServiceDetail from './componenets/ServiceDetail.jsx'
import { BookingProvider } from './context/BookingContext.jsx'
import BookingForm from './componenets/BookingForm.jsx'
import OTPVerification from './componenets/OtpVerification.jsx'
import BookingConfirmation from './componenets/BookingConfirmation.jsx'


export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<ServiceListing />} />
           <Route path="/service/:id" element={<ServiceDetail />} />
           <Route path="/service/:id/book" element={<BookingForm />} />
           <Route path="/service/:id/verify" element={<OTPVerification />} />
           <Route path="/confirmation" element={<BookingConfirmation />} />
          <Route path="*" element={<ServiceListing />} />
        </Routes>
      </main>
    </div>
  )
}
