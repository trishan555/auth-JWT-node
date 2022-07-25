const express = require('express')
const app = express()
require('dotenv').config()

app.get('/', (req, res) => res.send('Hello'))

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server up and running on ${port}`)
})
