import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './ProgramDetail.css'
import { API_URL } from '../config' // <--- 1. We import the address helper

function ProgramDetail() {
  const { id } = useParams()
  const [program, setProgram] = useState(null)

  useEffect(() => {
    // 2. We use API_URL instead of "http://localhost:3001"
    fetch(`${API_URL}/programs/${id}`)
      .then(res => res.json())
      .then(data => setProgram(data))
      .catch(err => console.error(err))
  }, [id])

  if (!program) return <div className="loading">Loading...</div>

  return (
    <div className="detail-container">
      <img src={program.img} alt={program.title} className="detail-hero" />
      
      <h1 className="detail-title">{program.title}</h1>
      <p className="detail-desc">{program.desc}</p>
      
      <div className="schedule-card">
        <h3>Weekly Schedule</h3>
        <ul className="schedule-list">
            {program.schedule ? (
                program.schedule.map((day, index) => (
                    <li key={index}>{day}</li>
                ))
            ) : (
                <li>No schedule available</li>
            )}
        </ul>
      </div>
    </div>
  )
}

export default ProgramDetail