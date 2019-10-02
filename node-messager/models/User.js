const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userScheme = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: 'http://127.0.0.1:3000/public/img/avatar-default.png'
    },
    identity: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('user', userScheme)