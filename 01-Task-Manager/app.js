require('dotenv').config()
const express = require('express')
const taskRouter = require('./routes/tasks.js')
const connectDB = require('./db/connect')
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')


const app = express()

app.use(express.static('./public'))
app.use(express.json())

app.use('/api/v1/tasks', taskRouter)
app.use(notFound)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000


const start = async () => {
    try{
    await connectDB(process.env.MONGO_URL)
    app.listen(3000, () => {
      console.log(`Server listening on port ${port}`);
    })
  } catch (e) {
    console.log(e);
  }
}

start()
