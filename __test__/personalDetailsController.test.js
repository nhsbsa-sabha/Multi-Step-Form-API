const chai = require('chai')
const sinon = require('sinon')
const expect = chai.expect
const httpMocks = require('node-mocks-http')
const proxyquire = require('proxyquire')

// Create stubs
const getValidationResultStub = sinon.stub()
const getOrCreateSessionUserIdStub = sinon.stub()
const saveStepStub = sinon.stub()

// Use proxyquire to inject all dependencies
const { postPersonalDetails } = proxyquire('../controllers/personalDetailsController', {
  '../helpers/validationHelper': { getValidationResult: getValidationResultStub },
  '../helpers/sessionHelpers': { getOrCreateSessionUserId: getOrCreateSessionUserIdStub },
  '../storage/formStorage': { saveStep: saveStepStub },
})

describe('PersonalDetailsController', () => {
  let req, res

  beforeEach(() => {
    // Set up mocks for request and response
    req = httpMocks.createRequest({
      method: 'POST',
      body: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
      },
      session: {}, // Required if your session helper accesses req.session.id
    })
    res = httpMocks.createResponse()

    getOrCreateSessionUserIdStub.returns('fake-user-id')
    saveStepStub.reset()
  })

  afterEach(() => {
    sinon.restore()
    getValidationResultStub.reset()
    getOrCreateSessionUserIdStub.reset()
  })

  it('should save personal details and respond with success', async () => {
    getValidationResultStub.returns({ isEmpty: () => true })

    await postPersonalDetails(req, res)

    expect(res.statusCode).to.equal(200)
    const data = res._getData()
    expect(data.message).to.equal('Personal details saved successfully')
    expect(saveStepStub.calledOnceWith('fake-user-id', 1, req.body)).to.be.true
  })

  it('should return 400 if validation errors exist', async () => {
    getValidationResultStub.returns({
      isEmpty: () => false,
      array: () => [{ msg: 'Error' }],
    })

    await postPersonalDetails(req, res)

    expect(res.statusCode).to.equal(400)
    const data = res._getJSONData()
    expect(data.errors).to.be.an('array')
  })
})
