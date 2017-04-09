import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const UserSchemaJWT = new Schema({
    username: String,
    password: String
})

const UserJWT = mongoose.model('users', UserSchemaJWT, 'users');

module.exports = {
    get: function(data, callback) {
        console.log("data", data)
        UserJWT.findOne({ name: data.username }, function(err, user) {
            callback(err, user);
        });
    },
    create: function(data, callback) {
        data = modifyDataInSomeWay(data);
        var newUser = new User(data);
        newUser.save(function(err, savedUser) {
            // some logic here
            callback(err, savedUser);
        });
    },
    fetch: function(callback) {
        UserJWT.find({}, function(err, user) {
            callback(err, user)
        })
    }
};