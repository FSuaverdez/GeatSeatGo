const { Router } = require('express')
const authController = require('../controllers/authController')
const adminController = require('../controllers/adminController')
const router = Router()

router.get('/admin', adminController.admin_get)
router.get('/admin/login', authController.login_get)
router.post('/admin/login', authController.login_post)

module.exports = router
