const Movie = require('../models/Movie')
const Schedule = require('../models/Schedule')
module.exports.schedule_get = async (req, res) => {
  try {
    const schedule = await Schedule.findOne({ _id: req.params.id })
    res.render('buy', { schedule })
  } catch (error) {
    console.log(error)
  }
}

module.exports.schedulesId_get = async (req, res) => {
  try {
    let schedule = await Schedule.findById(req.params.id)
    res.status(201).json({ schedule })
  } catch (err) {
    const errors = handleErrors(err)
    console.log(errors)
    res.status(400).json({ errors })
  }
}
