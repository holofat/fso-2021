const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const config = require('./utils/config')

const mongoUri = config.MONGODB_URI

const mongoConnect = async () => {
  try {
    await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    logger.info('MongoDB is connected')
  } catch (e) {
    logger.error(e.message)
  }
}
mongoConnect()
logger.info('connecting to', config.MONGODB_URI)
app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.reqLogger)

app.use('/api/blogs/', blogRouter)
app.use('/api/users/', userRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
