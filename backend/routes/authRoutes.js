const express = require('express')
const { login, register, logout, isAuth } = require('../controllers/authControllers')
const { requireAuth } = require('../middleware/user')
const router = express.Router()


router.get('/requireAuth', isAuth)
router.post('/register', register)
router.post('/login', login)
router.get('/logout', requireAuth, logout)


module.exports = router