const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
app.use(cors())
app.use(express.json())

// -----------------------------------------------------------
// 👇 PASTE YOUR CONNECTION STRING HERE 👇
// -----------------------------------------------------------
const mongoURI = "mongodb+srv://admin:password123%40@cluster0.dderos0.mongodb.net/?appName=Cluster0"

mongoose.connect(mongoURI)
.then(() => console.log("MongoDB Connected Successfully!"))
.catch(err => console.error("MongoDB Connection Failed:", err))

// --- 1. NEW BLUEPRINT (Schema) ---
// We added "schedule", which is an Array of Strings (List of text)
const ProgramSchema = new mongoose.Schema({
    id: Number,
    title: String,
    desc: String,
    img: String,
    schedule: [String] // <--- NEW!
})
const ProgramModel = mongoose.model("programs", ProgramSchema)

// --- ROUTES ---

app.get('/programs', async (req, res) => {
    const programs = await ProgramModel.find()
    res.json(programs)
})

app.get('/programs/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const program = await ProgramModel.findOne({ id: id })
    if (program) res.json(program)
    else res.status(404).json({ message: "Not found" })
})

// --- 2. NEW DATA (Seed) ---
app.get('/seed', async (req, res) => {
    const initialData = [
        {
            id: 1,
            title: "Muscle Building",
            desc: "Maximize hypertrophy with high volume training.",
            img: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1470&auto=format&fit=crop",
            schedule: [
                "Monday: Chest & Triceps",
                "Tuesday: Back & Biceps",
                "Wednesday: Rest",
                "Thursday: Legs & Shoulders",
                "Friday: Upper Body Mix",
                "Saturday: Active Recovery",
                "Sunday: Rest"
            ]
        },
        {
            id: 2,
            title: "Fat Loss",
            desc: "Burn fat fast with high intensity circuits.",
            img: "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=1469&auto=format&fit=crop",
            schedule: [
                "Monday: HIIT Circuit (45 mins)",
                "Tuesday: Full Body Cardio",
                "Wednesday: Active Rest (Walk)",
                "Thursday: Tabata Intervals",
                "Friday: Core & Conditioning",
                "Saturday: Long Run / Swim",
                "Sunday: Rest"
            ]
        },
        {
            id: 3,
            title: "Strength Power",
            desc: "Increase your raw power with heavy compounds.",
            img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop",
            schedule: [
                "Monday: Squat Focus (5x5)",
                "Tuesday: Bench Press Focus",
                "Wednesday: Rest",
                "Thursday: Deadlift Focus",
                "Friday: Overhead Press & Accessories",
                "Saturday: Light Mobility",
                "Sunday: Rest"
            ]
        }
    ]
    
    await ProgramModel.deleteMany({}) 
    await ProgramModel.insertMany(initialData)
    res.send("Database Updated with New Schedules!")
})
// ... existing code ...

// 4. HANDLE CONTACT FORM
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body
    
    // Log the message to the terminal (so we can see it works)
    console.log("--- NEW MESSAGE RECEIVED ---")
    console.log("From:", name)
    console.log("Email:", email)
    console.log("Message:", message)
    
    // Reply to the frontend
    res.json({ success: true, message: "Message sent successfully!" })
})

// ... app.listen is here
app.listen(3001, () => {
    console.log("Server is running on port 3001")
})