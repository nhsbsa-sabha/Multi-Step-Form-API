const express = require('express')
const check = require('express-validator')
const { validatePersonalDetails } = require('../validation/formValidation')
const PersonalDetailsController = require('../controllers/PersonalDetailsController')
const formProgressController = require('../controllers/formProgressController')

const router = express.Router()

router.post(
  '/form/save-step-1',
  validatePersonalDetails,
  PersonalDetailsController.postPersonalDetails
)
router.get('/form/progress', formProgressController.getFormProgress)
module.exports = router
