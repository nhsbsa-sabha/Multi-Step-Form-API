const express = require('express')
const check = require('express-validator')
const { validatePersonalDetails, validateAddressDetails } = require('../validation/formValidation')
const PersonalDetailsController = require('../controllers/PersonalDetailsController')
const formProgressController = require('../controllers/formProgressController')
const addressDetailsController = require('../controllers/addressDetailsController')


const router = express.Router()

router.post(
  '/form/save-step-1',
  validatePersonalDetails,
  PersonalDetailsController.postPersonalDetails
)
router.post(
  '/form/save-step-2',
  validateAddressDetails,
  addressDetailsController.postAddressDetails
)
router.get('/form/progress', formProgressController.getFormProgress)
module.exports = router
