const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true    
    },
    description: {
        type: String, 
        required: true    
    },
    duration: {
        type: Number, 
        required: true    
    },
    genre: {
        type: String, 
        required: true    
    },
    language: {
        type: String, 
        required: true    
    },
    releaseDate: {
        type: Date, 
        required: true    
    },
    poster: {
        type: String, 
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 0.1,
        max: 10.0
    },
});

const Movies = mongoose.model('movies', movieSchema);

module.exports = Movies;
