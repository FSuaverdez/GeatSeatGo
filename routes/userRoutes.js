const { Router } = require('express')
const request = require('request')
const {
  schedule_get,
  schedulesId_get,
} = require('../controllers/buyController')
const { movies_get } = require('../controllers/movieController')
const { movieSlug_get } = require('../controllers/movieController')
const { requireAuth } = require('../middlewares/authMiddleware')
const paypal = require('paypal-rest-sdk')

paypal.configure({
  mode: 'sandbox', //sandbox or live
  client_id:
    'AS0OYjYmD_LErfQVR-HptUpYDyRppEksv0HIXoB0ffSf1sufasjp64RCJdVkCmVDThFo9klYQQ1Ub0cL',
  client_secret:
    'EEd3Mm6m2-k1V825Cp_wIOFds6_34-zDCN57MwW0lEnTl4wAUag0PFBFBXYGVvgcDMu9LLfBUCw-MRzq',
})

const router = Router()

router.get('/', movies_get)
router.get('/:slug', movieSlug_get)
router.get('/buy/:id', requireAuth, schedule_get)
router.get('/schedule/:id', schedulesId_get)

module.exports = router
