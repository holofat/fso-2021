// Packages
const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')

// Controllers
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

// Utilities
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const config = require('./utils/config')

// Connecting to MongoDB
const mongoUri = config.MONGODB_URI

try {
  mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  logger.info('MongoDB is connected')
} catch (e) {
  logger.error(e.message)
}

// Built in Middleware
logger.info('connecting to', config.MONGODB_URI)
app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.tokenExtractor)

app.use('/api/blogs/', middleware.userExtractor, blogRouter)
app.use('/api/users/', userRouter)
app.use('/api/login/', loginRouter)

// Error
app.use(middleware.requestLogger)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
