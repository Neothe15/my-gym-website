import { useEffect, useState } from 'react'
import { API_URL } from './config' // Uses your smart config link

export default function Admin() {
    const [messages, setMessages] = useState([])

    useEffect(() => {
        // Ask the server for the secrets
        fetch(`${API_URL}/contacts`)
            .then(res => res.json())
            .then(data => setMessages(data))
            .catch(err => console.error("Failed to fetch:", err))
    }, [])

    return (
        <div style={{ padding: "50px", color: "white", minHeight: "100vh", backgroundColor: "#111" }}>
            <h1 style={{ color: "red", textAlign: "center" }}>Admin Dashboard 🔒</h1>
            
            <div style={{ maxWidth: "800px", margin: "0 auto" }}>
                {messages.map(msg => (
                    <div key={msg._id} style={{ 
                        border: "1px solid #333", 
                        borderRadius: "10px", 
                        padding: "20px", 
                        margin: "20px 0", 
                        backgroundColor: "#222"
                    }}>
                        <h3 style={{ margin: "0 0 10px 0" }}>FROM: {msg.name}</h3>
                        <p style={{ color: "#aaa", fontSize: "14px" }}>📧 {msg.email}</p>
                        <hr style={{ borderColor: "#333" }} />
                        <p style={{ fontSize: "18px", marginTop: "15px" }}>"{msg.message}"</p>
                        <p style={{ fontSize: "12px", color: "#666", textAlign: "right" }}>
                            {new Date(msg.date).toLocaleString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}