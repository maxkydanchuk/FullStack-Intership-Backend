import pkg from 'mongoose';

const {Schema, model} = pkg;


const personSchema = new Schema({
    fields: {
        name: String,
        birth_year: String,
        gender: String,
        eye_color: String,
        height: String,

    }
});

const Person = model('Person', personSchema, 'people');

export default Person;