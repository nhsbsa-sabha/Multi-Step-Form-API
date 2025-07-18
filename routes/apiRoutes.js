const express = require('express')
const check = require('express-validator')
const { validatePersonalDetails, validateAddressDetails } = require('../validation/formValidation')
const personalDetailsController = require('../controllers/personalDetailsController')
const formProgressController = require('../controllers/formProgressController')
const addressDetailsController = require('../controllers/addressDetailsController')
const reviewDetailsController = require('../controllers/reviewDetailsController')


const router = express.Router()

router.post(
  '/form/save-step-1',
  validatePersonalDetails,
  personalDetailsController.postPersonalDetails
)
router.post(
  '/form/save-step-2',
  validateAddressDetails,
  addressDetailsController.postAddressDetails
)
router.post(
  '/form/save-step-3',
  reviewDetailsController.postFormReview
)
router.get('/form/progress', formProgressController.getFormProgress)
module.exports = router
