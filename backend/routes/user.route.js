const express = require('express')
const router = express.Router()

const {
    signup_get,
    signup_post,
    login_post,
    login_get,
} = require('../controllers/user.controller')

router.get('/signup', signup_get)
router.post('/signup', signup_post)
router.get('/login', login_get)
router.post('/login', login_post)

module.exports = router
