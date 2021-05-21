require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const morgan = require('morgan')

const PORT = process.env.PORT || 8080
const MONGODB_URL = process.env.MONGODB_URL

mongoose.set('useCreateIndex', true);
mongoose.connect(MONGODB_URL, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', (error) => {
    console.error(error)
})

db.once('open', () => {
    console.log(`Connected to database ${MONGODB_URL}`)
})

// Log requests
app.use(morgan('tiny'))

app.use(express.json())

const moviesRouter = require('./routes/movies')
app.use('/movies', moviesRouter)

app.listen(PORT, () => {
    console.log(`Sever is running on http://localhost:${PORT}`)
})