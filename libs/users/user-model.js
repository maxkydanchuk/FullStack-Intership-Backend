import pkg from 'mongoose';
const {Schema, model} = pkg;

const userSchema = new Schema({
    email: String,
    password: String,
})

const User = model('User', userSchema);

export default User;