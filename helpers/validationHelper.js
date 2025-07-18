// helpers/validationHelper.js
const { validationResult } = require('express-validator')

function getValidationResult(req) {
  return validationResult(req)
}

module.exports = {
  getValidationResult,
}
