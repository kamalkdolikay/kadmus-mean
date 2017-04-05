import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: String,
    password: String
})

/*var UserSchema = new Schema({
    username: { type: String, unique: true },
    firstname: String,
    lastname: String,
    password: String,
    image: String,
    type: String,
    email: String,
    address: String,
    city: String,
    country: String,
    postalcode: String,
    aboutme: String
});*/

module.exports = mongoose.model('User', UserSchema, 'User');