import pkg from 'mongoose';

const {Schema, model} = pkg;


const movieSchema = new Schema({
    fields: {
        producer: String,
        title: String,
        episode_id: String,
        director: String,
        release_date: String,
        image_url: String,
        opening_crawl: String,
    }
})

const Movie = model('Movie', movieSchema, 'movies');

export default Movie