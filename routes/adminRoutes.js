const { Router } = require('express')
const authController = require('../controllers/authController')
const adminController = require('../controllers/adminController')
const adminMovieController = require('../controllers/adminMovieController')
const adminUserController = require('../controllers/adminUserController')
const { requireAdminAuth } = require('../middlewares/authMiddleware')
const router = Router()

// ADMIN LOGIN
router.get('/admin/login', adminController.admin_login_get)
router.post('/admin/login', adminController.admin_login_post)

// ADMIN LOGOUT
router.get('/admin/logout', adminController.admin_logout_get)
router.get('/admin', adminController.admin_get)

// ADMIN MOVIES
router.get('/admin/movies', requireAdminAuth, adminMovieController.movies_get)
router.post('/admin/movies', requireAdminAuth, adminMovieController.movies_post)
router.delete(
  '/admin/movies/:id',
  requireAdminAuth,
  adminMovieController.movies_delete
)
router.put(
  '/admin/movies/:id',
  requireAdminAuth,
  adminMovieController.movies_edit
)

// USER

router.get('/admin/users', requireAdminAuth, adminUserController.users_get)
router.post('/admin/users', requireAdminAuth, adminUserController.users_post)
router.put('/admin/users/:id', requireAdminAuth, adminUserController.users_edit)

module.exports = router
