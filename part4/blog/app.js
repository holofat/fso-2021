const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const router = require('./controllers/blogs')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const config = require('./utils/config')

logger.info('connecting to', config.MONGODB_URI)

const mongoUri = config.MONGODB_URI

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => logger.info('MongoDB is connected'))
  .catch(err => logger.error(err.message))

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.reqLogger)

app.use('/api/notes', router)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
