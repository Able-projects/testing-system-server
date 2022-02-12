const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Section = new Schema(
 {
 id: { type: Number, required: true },
 name: { type: String, required: true },
 },
 { timestamps: true },
)
module.exports = mongoose.model('sections', Section)