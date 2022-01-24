import pkg from 'mongoose';
const {Schema, model} = pkg;

const starshipSchema = new Schema({
    fields: {
        pilots: String,
        MGLT: String,
        starship_class: String,
        hyperdrive_rating: String,
    }
})

const Starship = model('Starship', starshipSchema, 'starships');

export default Starship;