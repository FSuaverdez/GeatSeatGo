const { Router } = require('express')
const {
  schedule_get,
  schedulesId_get,
} = require('../controllers/buyController')
const { movies_get } = require('../controllers/movieController')
const { movieSlug_get } = require('../controllers/movieController')
const { requireAuth } = require('../middlewares/authMiddleware')

const router = Router()

router.get('/', movies_get)
router.get('/:slug', movieSlug_get)
router.get('/buy/:id', requireAuth, schedule_get)
router.get('/schedule/:id', schedulesId_get)

module.exports = router
