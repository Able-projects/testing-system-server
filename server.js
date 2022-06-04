const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const apiPort = process.env.PORT || 5000
const db = require('./db')
const authenticate = require('./validators/auth')
const userRoutes = require('./routes/userRoutes')
const levelRoutes = require('./routes/levelRoutes')
const sectionRoutes = require('./routes/sectionRoutes')
const questionRoutes = require('./routes/questionRoutes')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(authenticate)
app.use(bodyParser.json())
app.use('/api', userRoutes)
app.use('/api', levelRoutes)
app.use('/api', sectionRoutes)
app.use('/api', questionRoutes)
app.get('/', (req, res) => {
 res.send('Welcome to Able testing server!')
})
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))



