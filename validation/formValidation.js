const { check } = require('express-validator')
const ukPostcodeRegex = /^([A-Z]{1,2}[0-9][0-9]?[A-Z]?)\s*([0-9][A-Z]{2})$/i;

const validatePersonalDetails = [
  check('firstName')
    .notEmpty().withMessage('First name is required')
    .isLength({ max: 50 }).withMessage('First name must be less than 50 characters')
    .matches(/^[a-zA-Z\s]+$/).withMessage('First name should only contain letters and spaces.'),

  check('lastName')
    .notEmpty().withMessage('Last name is required')
    .isLength({ max: 50 }).withMessage('Last name must be less than 50 characters')
    .matches(/^[a-zA-Z\s]+$/).withMessage('Last name should only contain letters and spaces.'),

  check('email')
    .isEmail().withMessage('Invalid email format')
    .isLength({ max: 100 }).withMessage('Email must be less than 100 characters')
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).withMessage('Email must be a valid email address')
]

const validateAddressDetails = [
  check('street')
    .notEmpty().withMessage('Street is required')
    .isLength({ max: 50 }).withMessage('Street must be less than 50 characters'),

  check('city')
    .notEmpty().withMessage('City is required')
    .isLength({ max: 20 }).withMessage('City must be less than 20 characters'),

  check('postCode')
    .notEmpty().withMessage('Post code is required')
    .isLength({ max: 10 }).withMessage('Post code must be less than 10 characters')
    .matches(ukPostcodeRegex).withMessage('Post code must be a valid UK postcode')
]

module.exports = {
  validatePersonalDetails,
  validateAddressDetails
}