import React from 'react'
import { Link } from 'react-router-dom' // <--- We import the Link tool

import './Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">GymPro</div>
      <ul className="nav-links">
        {/* We use Link "to" instead of a "href" */}
        <li><Link to="/">Home</Link></li>
        <li><Link to="/workouts">Workouts</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar