const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
app.use(cors())
app.use(express.json())

// -----------------------------------------------------------
// 👇 CONNECTION STRING 👇
// -----------------------------------------------------------
const mongoURI = "mongodb+srv://admin:password123%40@cluster0.dderos0.mongodb.net/?appName=Cluster0"

mongoose.connect(mongoURI)
.then(() => console.log("MongoDB Connected Successfully!"))
.catch(err => console.error("MongoDB Connection Failed:", err))

// --- BLUEPRINT 1: PROGRAMS ---
const ProgramSchema = new mongoose.Schema({
    id: Number,
    title: String,
    desc: String,
    img: String,
    schedule: [String]
})
const ProgramModel = mongoose.model("programs", ProgramSchema)

// --- BLUEPRINT 2: CONTACTS (THIS WAS MISSING!) ---
const ContactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    date: { type: Date, default: Date.now } // Auto-add the time
})
const ContactModel = mongoose.model("contacts", ContactSchema)


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

// --- SEED DATA ---
app.get('/seed', async (req, res) => {
    // (Keeping your seed logic the same, just shortened for clarity here)
    // You don't need to change this part, it's fine.
    res.send("Seed route is active (use your previous seed data if needed)")
})
// --- NEW: GET ALL MESSAGES (For Admin) ---
app.get('/contacts', async (req, res) => {
    try {
        const messages = await ContactModel.find()
        res.json(messages)
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch messages" })
    }
})

// --- HANDLE CONTACT FORM (FIXED) ---
app.post('/contact', async (req, res) => {  // Added 'async'
    const { name, email, message } = req.body
    
    console.log("--- NEW MESSAGE RECEIVED ---")
    console.log("From:", name)
    
    
    try {
        // 1. Create the new contact document
        const newContact = new ContactModel({ name, email, message })
        
        // 2. SAVE IT to MongoDB!
        await newContact.save()
        
        console.log("Message saved to Database!")
        res.json({ success: true, message: "Message saved successfully!" })
    } catch (error) {
        console.error("Error saving message:", error)
        res.status(500).json({ success: false, error: "Failed to save message" })
    }
})

app.listen(3001, () => {
    console.log("Server is running on port 3001")
})