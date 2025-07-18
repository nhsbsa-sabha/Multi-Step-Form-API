const chai = require('chai')
const sinon = require('sinon')
const expect = chai.expect
const httpMocks = require('node-mocks-http')
const proxyquire = require('proxyquire')


const formStorageStub = {
  saveStep: sinon.stub()
}
const sessionHelpersStub = {
  getOrCreateSessionUserId: sinon.stub()
}
const validationResultStub = sinon.stub()

const { postAddressDetails } = proxyquire('../controllers/addressDetailsController', {
  'express-validator': {
    validationResult: validationResultStub
  },
  '../storage/formStorage': formStorageStub,
  '../helpers/sessionHelpers': sessionHelpersStub
})

describe('postAddressDetails', () => {
  let req, res

  beforeEach(() => {
   
    sinon.resetHistory()

    sessionHelpersStub.getOrCreateSessionUserId.returns('fake-user-id')
    formStorageStub.saveStep.resolves()

    req = httpMocks.createRequest({
      method: 'POST',
      body: {
        street: '123 Main St',
        city: 'Anytown',
        postCode: '12345',
      },
    })

    res = httpMocks.createResponse()
  })

  it('should save address details and respond with success', async () => {
    validationResultStub.returns({
      isEmpty: () => true,
      array: () => []
    })

    await postAddressDetails(req, res)

    expect(res.statusCode).to.equal(200)
    const data = res._getData()
    expect(data.message).to.equal('Address details saved successfully')
    expect(formStorageStub.saveStep.calledOnceWith('fake-user-id', 2, req.body)).to.be.true
  })

  it('should return 400 if validation errors exist', async () => {
    validationResultStub.returns({
      isEmpty: () => false,
      array: () => [{ msg: 'Validation error' }]
    })

    await postAddressDetails(req, res)

    expect(res.statusCode).to.equal(400)
    const data = res._getJSONData()
    expect(data.errors).to.be.an('array')
    expect(data.errors[0].msg).to.equal('Validation error')
  })

  it('should return 500 on internal server error', async () => {
    validationResultStub.returns({
      isEmpty: () => true,
      array: () => []
    })

    formStorageStub.saveStep.rejects(new Error('Boom'))

    await postAddressDetails(req, res)

    expect(res.statusCode).to.equal(500)
    const data = res._getJSONData()
    expect(data.message).to.equal('Internal server error')
  })
})
