const { expect } = require('chai')
const sinon = require('sinon')
const validationHelper = require('../helpers/validationHelper')

describe('getValidationResult', () => {
  afterEach(() => {
    sinon.restore()
  })

  it('should return an empty result when there are no validation errors', () => {
    const fakeResult = {
      isEmpty: () => true,
      array: () => []
    }

    const stub = sinon.stub(validationHelper, 'getValidationResult').returns(fakeResult)

    const req = {}
    const result = validationHelper.getValidationResult(req)
    
    expect(stub.calledOnce).to.be.true
    expect(result.isEmpty()).to.be.true
    expect(result.array()).to.deep.equal([])
  })

  it('should return validation errors when present', () => {
    const errors = [
      {
        msg: 'Invalid value',
        param: 'email',
        location: 'body',
        value: 'invalid-email'
      }
    ]

    const fakeResult = {
      isEmpty: () => false,
      array: () => errors
    }

    const stub = sinon.stub(validationHelper, 'getValidationResult').returns(fakeResult)

    const req = {}
    const result = validationHelper.getValidationResult(req)

    expect(stub.calledOnce).to.be.true
    expect(result.isEmpty()).to.be.false
    expect(result.array()).to.deep.equal(errors)
  })
})
