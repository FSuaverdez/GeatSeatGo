const { Router } = require('express')
const authController = require('../controllers/authController')
const router = Router()

router.get('/signup', authController.signup_get)
router.post('/signup', authController.signup_post)
router.get('/login', authController.login_get)
router.post('/login', authController.login_post)

router.get('/admin/signup', authController.signup_get)
router.post('/admin/signup', authController.signup_post)
router.get('/admin/login', authController.login_get)
router.post('/admin/login', authController.login_post)

module.exports = router
