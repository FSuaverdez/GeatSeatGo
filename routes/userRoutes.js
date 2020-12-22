const { Router } = require('express')
const {
  schedule_get,
  schedulesId_get,
  buyTicket_post,
  orderConfirm_get,
} = require('../controllers/buyController')
const { movies_get } = require('../controllers/movieController')
const { movieSlug_get } = require('../controllers/movieController')
const { requireAuth, checkUser } = require('../middlewares/authMiddleware')

const router = Router()

router.get('/', movies_get)
router.get('/:slug', movieSlug_get)
router.get('/buy/:id', requireAuth, schedule_get)
router.post('/buy/:id', requireAuth, checkUser, buyTicket_post)
router.get('/schedule/:id', schedulesId_get)
router.get('/buy/confirm/:id', orderConfirm_get)

module.exports = router
