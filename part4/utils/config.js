require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

const DB = process.env.DB
const DB_TEST = process.env.DB_TEST

module.exports = {
  MONGODB_URI,
  PORT,
  DB,
  DB_TEST
}
