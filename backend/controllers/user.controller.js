const User = require('../models/user.model')

const signup_get = (req, res) => {
    res.send('signup')
}

const signup_post = async (req, res) => {
    const { email, password } = req.body
    const newUser = {
        email,
        password,
    }

    try {
        const user = await User.create(newUser)
        res.status(201).json(user)
    } catch (err) {
        console.log(err)
        res.status(400).send('User not created')
    }
}

const login_get = (req, res) => {
    res.render('login')
}

const login_post = (req, res) => {
    res.send('user log in')
}

module.exports = {
    signup_get,
    signup_post,
    login_post,
    login_get,
}

const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// login a user
const loginUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.login(email, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// signup a user
const signupUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.signup(email, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

module.exports = { signupUser, loginUser }
