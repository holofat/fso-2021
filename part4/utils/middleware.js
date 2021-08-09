const logger = require('./logger')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const requestLogger = (request, response, next) => {
  logger.info('Method: ', request.method)
  logger.info('Path: ', request.path)
  logger.info('Body: ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  if (error.name === 'Casterror') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'Validationerror') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenerror') {
    return response.status(401).json({ error: 'invalid token' })
  }

  logger.error(error.message)
  next(error)
}

const tokenExtractor = (request, response, next) => {
  const auth = request.get('authorization')
  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    request.token = auth.substring(7)
  } else {
    request.token = null
  }

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    request.decodedToken = decodedToken
  } catch (error) {
    request.decodedToken = null
  }

  next()
}

const userExtractor = (request, response, next) => {
  request.user = request.body.userid

  next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}
