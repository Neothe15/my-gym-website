import React from 'react'
// 👇 THIS LINE was likely missing or broken. It tells React what "Router" is.
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Import Components
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Programs from './components/Programs'
import Footer from './components/Footer'
import Admin from './Admin'

// Import Pages
import Workouts from './pages/Workouts'
import Contact from './pages/Contact'
import ProgramDetail from './pages/ProgramDetail'

function App() {
  return (
    // 👇 This checks the "Router" import above. If the import is missing, this crashes.
    <Router>
      <Navbar />
      
      <Routes>
        {/* Home Page */}
        <Route path="/" element={
          <>
            <Hero />
            <Programs />
          </>
        } />

        {/* Other Pages */}
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<Admin />} />
        
        {/* The Detail Page (Dynamic) */}
        <Route path="/program/:id" element={<ProgramDetail />} />
      </Routes>

      <Footer />
    </Router>
  )
}

export default App