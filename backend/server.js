require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/user.route')
const { requireAuth, checkUser } = require('./middlewares/authMiddleware')

//express app
const app = express()

/**
 * * app.use(express.json()) -> this is used for when we make request from client side
 * *we have to gather those data using req method in controller
 * !req.body -> without following middleware we cant access the object
 * !and cannot access the data which is user sent
 */

//middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors())

//routes
app.use(userRoutes)
app.get('/another', requireAuth, (req, res) => res.send('requireAuth'))
app.get('*', checkUser)
//app.get('/', (req, res) => res.send('Hello'))

//mongodb connection
mongoose
    .connect(process.env.MONGO_DB_URI)
    .then(() => console.log('MongoDB connection established successfully'))
    .catch((err) => console.log(err))

//port defining
const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server up and running on ${port} 👻`)
})
