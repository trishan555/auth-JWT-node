const User = require('../models/user.model')
const jwt = require('jsonwebtoken')

const maxAge = 3 * 24 * 60 * 60
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: maxAge,
    })
}

//handle error
const handleErrors = (err) => {
    console.log(err.message, err.code)
    let errors = { email: '', password: '' }

    //incorrrect email
    if (err.message === 'Incorrect email') {
        errors.email = 'Invalid Email !'
    }

    //incorrrect password
    if (err.message === 'Incorrect password') {
        errors.password = 'Invalid Password !'
    }

    //duplicate error code
    if (err.code === 11000) {
        errors.email = 'Email is already registered'
        return errors
    }

    //validation errors
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
    }
    return errors
}

const signup_get = (req, res) => {
    res.send('signup') //render signup page
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
        const errors = handleErrors(err)
        //console.log(err)
        res.status(400).json({ errors })
    }
}

const login_get = (req, res) => {
    res.render('login') //render login page
}

const login_post = async (req, res) => {
    const { email, password } = req.body

    try {
        //*login function implemented in model class
        const user = await User.login(email, password)
        const token = createToken(user._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.status(200).json({ user: user._id })
    } catch (err) {
        const errors = handleErrors(err)
        //console.log(err)
        res.status(400).json({})
    }
}

module.exports = {
    signup_get,
    signup_post,
    login_post,
    login_get,
}
