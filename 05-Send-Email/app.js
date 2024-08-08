require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

const sendEmail = require('./controllers/sendEmail')

app.use(express.json())

// routes
app.get('/', (req, res) => {
  res.send('<h1>Email Project</h1> <a href ="/send">Send Email</a>')
})

app.get('/send', sendEmail)

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Server is listening on port ${port}...`))
