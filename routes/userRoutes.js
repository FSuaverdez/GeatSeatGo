const { Router } = require('express')
const { movies_get } = require('../controllers/movieController')
const { movieSlug_get } = require('../controllers/movieController')

const router = Router()

router.get('/', movies_get)
router.get('/:slug', movieSlug_get)

module.exports = router
