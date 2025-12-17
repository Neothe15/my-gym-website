import React from 'react'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3>GymPro</h3>
        <p>Join the revolution. Build your body, build your mind.</p>
        <div className="socials">
          <span>Instagram</span>
          <span>Facebook</span>
          <span>Twitter</span>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 GymPro Website. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer