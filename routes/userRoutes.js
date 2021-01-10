const { Router } = require('express')
const buyController = require('../controllers/buyController')
const { movies_get } = require('../controllers/movieController')
const { movieSlug_get } = require('../controllers/movieController')
const { requireAuth, checkUser } = require('../middlewares/authMiddleware')

const router = Router()

router.get('/', movies_get)
router.get('/:slug', movieSlug_get)
router.get('/buy/:id', requireAuth, buyController.schedule_get)
router.post('/buy/:id', requireAuth, checkUser, buyController.buyTicket_post)
router.get('/schedule/:id', buyController.schedulesId_get)
router.get('/buy/confirm/:id', buyController.orderConfirm_get)

module.exports = router
