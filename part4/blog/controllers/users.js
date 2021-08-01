const User = require('../models/user.model')
const router = require('express').Router()
const bcrypt = require('bcrypt')

router.post('/', async (req, res) => {
  const body = req.body

  const saltRounds = 10
  try {
    if (body.password > 3) {
      const passwordHash = await bcrypt.hash(body.password, saltRounds)

      const user = new User({
        username: body.username,
        name: body.name,
        passwordHash
      })

      const savedUser = await user.save()

      console.log('a user is succesfully created')
      res.json(savedUser)
    } else if (body.password === '') {
      res.json({ error: 'Password must be defined' })
    } else {
      res.json({ error: 'Password length must be greater than 3' }).status(400).end()
    }
  } catch (e) {
    res.json(e)
  }
})

router.get('/', async (req, res) => {
  try {
    const users = await User.find().populate('blogs')
    res.send(JSON.stringify(users))
  } catch (e) {
    res.json(e)
  }
})

module.exports = router
