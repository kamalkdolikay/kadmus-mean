import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: String,
    password: String
})

module.exports = mongoose.model('User', UserSchema, 'User');