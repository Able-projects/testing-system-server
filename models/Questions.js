const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Question = new Schema(
 {
    question: { type: String, required: true },
    option1: { type: String, required: false },
    option2: { type: String, required: false },
    option3: { type: String, required: false },
    option4: { type: String, required: false },
    option5: { type: String, required: false },
    answer: { type: String, required: true },
    score: { type: Number, required: true },
    sectionId: { type: String, required: true },
    levelId: { type: String, required: true },
 },
 { timestamps: true },
)
module.exports = mongoose.model('questions', Question)