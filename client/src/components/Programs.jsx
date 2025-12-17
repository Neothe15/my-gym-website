import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Programs.css'
import { API_URL } from '../config' // <--- 1. Import the address

function Programs() {
  const [programs, setPrograms] = useState([])

  useEffect(() => {
    // 2. Use the variable instead of "localhost"
    fetch(`${API_URL}/programs`)
      .then(response => response.json())
      .then(data => setPrograms(data))
      .catch(err => console.error("Error fetching data:", err))
  }, [])

  return (
    <div className="programs-section">
      <h2 className="section-title">FEATURED WORKOUTS</h2>
      <div className="programs-grid">
        {programs.map((program) => (
          <Link to={`/program/${program.id}`} key={program.id} style={{textDecoration: 'none'}}>
            <div className="program-card">
              <img src={program.img} alt={program.title} />
              <h3>{program.title}</h3>
              <p>{program.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Programs