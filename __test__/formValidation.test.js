const { expect } = require('chai')
const { validationResult } = require('express-validator')
const { validatePersonalDetails, validateAddressDetails } = require('../validation/formValidation')
const httpMocks = require('node-mocks-http')

describe('Validation Middleware', () => {
  async function runValidation(middlewares, body) {
    const req = httpMocks.createRequest({ method: 'POST', body })
    const res = httpMocks.createResponse()
    for (const middleware of middlewares) {
      await new Promise((resolve, reject) => {
        middleware(req, res, err => (err ? reject(err) : resolve()))
      })
    }
    return validationResult(req)
  }

  describe('validatePersonalDetails', () => {
    it('should fail if firstName is empty', async () => {
      const result = await runValidation(validatePersonalDetails, {
        firstName: '',
        lastName: 'Smith',
        email: 'alice@example.com'
      })

      expect(result.isEmpty()).to.be.false
      
      // Check if there's any error for firstName with expected message
      const errors = result.array()
      const hasExpectedError = errors.some(err => 
        err.path === 'firstName' && err.msg === 'First name is required'
      )
      expect(hasExpectedError).to.be.true
    })

    it('should fail if email is invalid', async () => {
      const result = await runValidation(validatePersonalDetails, {
        firstName: 'Alice',
        lastName: 'Smith',
        email: 'invalid-email'
      })

      expect(result.isEmpty()).to.be.false

      const errors = result.array()
      const hasExpectedError = errors.some(err => 
        err.path === 'email' && err.msg === 'Invalid email format'
      )
      expect(hasExpectedError).to.be.true
    })
  })

  describe('validateAddressDetails', () => {
    it('should fail if street is empty', async () => {
      const result = await runValidation(validateAddressDetails, {
        street: '',
        city: 'London',
        postCode: 'SW1A 1AA'
      })

      expect(result.isEmpty()).to.be.false

      const errors = result.array()
      const hasExpectedError = errors.some(err => 
        err.path === 'street' && err.msg === 'Street is required'
      )
      expect(hasExpectedError).to.be.true
    })

    it('should fail if postcode is invalid', async () => {
      const result = await runValidation(validateAddressDetails, {
        street: '10 Downing St',
        city: 'London',
        postCode: 'INVALID'
      })

      expect(result.isEmpty()).to.be.false

      const errors = result.array()
      const hasExpectedError = errors.some(err => 
        err.path === 'postCode' && err.msg === 'Post code must be a valid UK postcode'
      )
      expect(hasExpectedError).to.be.true
    })
  })
})
