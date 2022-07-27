const User = require('../models/user.model')
const jwt = require('jsonwebtoken')

const maxAge = 3 * 24 * 60 * 60
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: maxAge,
    })
}

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
        //create token
        const token = createToken(user._id)
        //send token with cookie to the web browser
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })

        res.status(201).json({ user: user._id })
    } catch (err) {
        console.log(err)
        res.status(400).send('User not created')
    }
}

const login_get = (req, res) => {
    res.render('login')
}

const login_post = async (req, res) => {
    const { email, password } = req.body

    try {
        const token = createToken(user._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })

        //*login function implemented in model class
        const user = await User.login(email, password)
        res.status(200).json({ user: user._id })
    } catch (err) {
        res.status(400).json({})
    }
}

module.exports = {
    signup_get,
    signup_post,
    login_post,
    login_get,
}
