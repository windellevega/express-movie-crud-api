const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    plot_summary: {
        type: String,
        required: true
    },
    genres: {
        type: Array,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    picture_url: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Movie', movieSchema)