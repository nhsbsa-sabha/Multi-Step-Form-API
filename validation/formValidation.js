const { check } = require('express-validator')

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

module.exports = {
  validatePersonalDetails
}