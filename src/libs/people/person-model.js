import pkg from 'mongoose';
const {Schema, model} = pkg;


const personSchema = new Schema({
    fields: {
        name: String,
        gender: String,
        skin_color: String,
        hair_color: String,
        height: String,
        eye_color: String,
        mass: String,
        birth_year: String
    }
})

const Person = model('Person', personSchema, 'people');

export default Person