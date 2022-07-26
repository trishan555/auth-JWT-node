const signup_get = (req, res) => {
    res.render('signup')
}
const signup_post = (req, res) => {
    console.log(req.body)
    res.send('signup user')
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
