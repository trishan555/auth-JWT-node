const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

const app = express()
require('dotenv').config()
const userRoutes = require('./routes/user.route')

/**
 * *this is used for when we make request from client side
 * *we have to gather those data using req method in controller
 * !req.body -> without following middleware we cant access the object
 * !and cannot access the data which is user sent
 */

app.use(express.json())
app.use(cookieParser())

//routines
app.get('/', (req, res) => res.send('Hello'))
app.use(userRoutes)

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
