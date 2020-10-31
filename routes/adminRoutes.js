const { Router } = require('express')
const authController = require('../controllers/authController')
const adminController = require('../controllers/adminController')
const { requireAdminAuth } = require('../middlewares/authMiddleware')
const router = Router()

router.get('/admin', requireAdminAuth, adminController.admin_get)
router.get('/admin/login', adminController.admin_login_get)
router.post('/admin/login', adminController.admin_login_post)
router.get('/admin/logout', adminController.admin_logout_get)

module.exports = router
