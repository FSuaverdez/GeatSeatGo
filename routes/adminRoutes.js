const { Router } = require('express')
const authController = require('../controllers/authController')
const adminController = require('../controllers/adminController')
const adminMoviesController = require('../controllers/adminMoviesController')
const { requireAdminAuth } = require('../middlewares/authMiddleware')
const router = Router()

// ADMIN LOGIN
router.get('/admin/login', adminController.admin_login_get)
router.post('/admin/login', adminController.admin_login_post)

// ADMIN LOGOUT
router.get('/admin/logout', adminController.admin_logout_get)

// ADMIN MOVIES
router.get('/admin', requireAdminAuth, adminMoviesController.movies_get)
router.post(
  '/admin/movies',
  requireAdminAuth,
  adminMoviesController.movies_post
)
router.delete(
  '/admin/movies/:id',
  requireAdminAuth,
  adminMoviesController.movies_delete
)
router.put(
  '/admin/movies/:id',
  requireAdminAuth,
  adminMoviesController.movies_edit
)

module.exports = router
