const mongoose = require('mongoose')
const Schema = mongoose.Schema
const profileSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    describe: {
        type: String,
        required: true
    },
    income: {
        type: String,
        required: true
    },
    expend: {
        type: String,
        required: true
    },
    cash: {
        type: String,
        required: true
    },
    remark: {
        type: String,
        default: ''
    },
    date: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('profile', profileSchema)