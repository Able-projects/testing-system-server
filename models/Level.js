const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Levels = new Schema(
 {
 name: { type: String, required: true },
 },
 { timestamps: true },
)
module.exports = mongoose.model('levels', Levels)