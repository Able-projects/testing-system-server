const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = new Schema(
 {
 name: { type: String, required: true },
 email: { type: String, required: true },
 password: { type: String, required: true },
 rating: { type: Number, required: false },
 role: {type: String, required: false , default: 'user'}
 },
 { timestamps: true },
)
module.exports = mongoose.model('users', User)

// const body = {
//     name: 'dina',
//     email: "dede",
//     pass: "dede",
//     rating: 3245
// }