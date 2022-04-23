const mongoose = require('mongoose')
mongoose
 .connect('mongodb+srv://dianamaduan:test12345@cluster0.j6hzh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true })
 .catch(e => {
 console.error('Connection error', e.message)
 })
const db = mongoose.connection
module.exports = db

