const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//User Schema
const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Boolean,
        required: true
    }
},
    {collection:'Users'}
);

const User = module.exports = mongoose.model('User',UserSchema);

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
}

module.exports.getUserByUserName = function(username, callback) {
    const query = {username: username}
    User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (error, hsah) =>{
            if(err) throw error;
            newUser.password = hsah;
            newUser.save(callback);
        })
    })
}

module.exports.comparePassword = function(password, hash, callback) {
    bcrypt.compare(password,hash, (err, isMatch)=> {
        if(err) throw err;
        callback(null, isMatch)
    })
}