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
