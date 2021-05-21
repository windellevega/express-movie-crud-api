const express = require('express')
const router = express.Router()
const Movie = require('../models/movie')

// GET movies
router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find()
        res.json(movies)
    } 
    catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

// GET movies/:id
router.get('/:id', getMovie, async (req, res) => {
     res.json(res.movie)
})

// POST movies
router.post('/', async (req, res) => {
    const movie = new Movie({
        title: req.body.title,
        plot_summary: req.body.plot_summary,
        genres: req.body.genres,
        year: req.body.year,
        picture_url: req.body.picture_url
    })

    try {
        const newMovie = await movie.save()
        res.status(201).json(newMovie)
    } 
    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})

// PATCH movies/:id
router.patch('/:id', getMovie, async (req, res) => {
    if(req.body.title != null) {
        res.movie.title = req.body.title
    }

    if(req.body.plot_summary != null) {
        res.movie.plot_summary = req.body.plot_summary
    }

    if(req.body.genres != null) {
        res.movie.genres = req.body.genres
    }

    if(req.body.year != null) {
        res.movie.year = req.body.year
    }

    if(req.body.picture_url != null) {
        res.movie.picture_url = req.body.picture_url
    }

    try {
        const updatedMovie = await res.movie.save()
        res.json(updatedMovie)
    } 
    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})

// DELETE movies/:id
router.delete('/:id', getMovie, async (req, res) => {
    try {
        await res.movie.remove()

        res.json({
            message: 'Deleted movie'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

async function getMovie(req, res, next) {
    let movie

    try {
        movie = await Movie.findById(req.params.id)

        if (movie == null) {
            return res.status(404).json({
                        message: 'Cannot find movie'
                    })
        }
    } 
    catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }

    res.movie = movie
    next()
}

module.exports = router