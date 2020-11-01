const { Router } = require('express')
const authController = require('../controllers/authController')
const adminController = require('../controllers/adminController')
const adminMoviesController = require('../controllers/adminMoviesController')
const { requireAdminAuth } = require('../middlewares/authMiddleware')
const router = Router()

router.get('/admin', requireAdminAuth, adminController.admin_get)

// ADMIN LOGIN
router.get('/admin/login', adminController.admin_login_get)
router.post('/admin/login', adminController.admin_login_post)

// ADMIN LOGOUT
router.get('/admin/logout', adminController.admin_logout_get)

// ADMIN MOVIES
router.get('/admin/movies', requireAdminAuth, adminMoviesController.movies_get)
router.get(
  '/admin/movies/new',
  requireAdminAuth,
  adminMoviesController.newMovies_get
)
router.post(
  '/admin/movies/new',
  requireAdminAuth,
  adminMoviesController.movies_post
)

module.exports = router
