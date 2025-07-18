const chai = require('chai')
const sinon = require('sinon')
const expect = chai.expect
const httpMocks = require('node-mocks-http')
const proxyquire = require('proxyquire')


const formStorageStub = {
  getProgress: sinon.stub(),
  saveStep: sinon.stub()
}
const sessionHelpersStub = {
  getOrCreateSessionUserId: sinon.stub()
}


const { postFormReview } = proxyquire('../controllers/reviewDetailsController', {
  '../storage/formStorage': formStorageStub,
  '../helpers/sessionHelpers': sessionHelpersStub
})

describe('postFormReview', () => {
  let req, res

  beforeEach(() => {
    sinon.resetHistory()
    sessionHelpersStub.getOrCreateSessionUserId.returns('fake-user-id')
    formStorageStub.getProgress.reset()
    formStorageStub.saveStep.reset()

    req = httpMocks.createRequest({
      method: 'POST'
    })
    res = httpMocks.createResponse()
  })

  it('should combine data from step 1 and 2 and respond with success', async () => {
    formStorageStub.getProgress.withArgs('fake-user-id', 1).returns({ name: 'John' })
    formStorageStub.getProgress.withArgs('fake-user-id', 2).returns({ city: 'NYC' })
    formStorageStub.saveStep.resolves()

    await postFormReview(req, res)

    expect(formStorageStub.getProgress.calledWith('fake-user-id', 1)).to.be.true
    expect(formStorageStub.getProgress.calledWith('fake-user-id', 2)).to.be.true
    expect(formStorageStub.saveStep.calledOnceWith('fake-user-id', 3, { name: 'John', city: 'NYC' })).to.be.true

    expect(res.statusCode).to.equal(200)
    const data = res._getJSONData()
    expect(data.message).to.equal('Form review submitted successfully')
    expect(data.submittedData).to.deep.equal({ name: 'John', city: 'NYC' })
  })

  it('should handle missing data gracefully (empty objects)', async () => {
    formStorageStub.getProgress.withArgs('fake-user-id', 1).returns(null)
    formStorageStub.getProgress.withArgs('fake-user-id', 2).returns(undefined)
    formStorageStub.saveStep.resolves()

    await postFormReview(req, res)

    expect(formStorageStub.saveStep.calledOnceWith('fake-user-id', 3, {})).to.be.true

    expect(res.statusCode).to.equal(200)
    const data = res._getJSONData()
    expect(data.submittedData).to.deep.equal({})
  })

  it('should return 500 on internal server error', async () => {
    formStorageStub.getProgress.throws(new Error('Boom'))

    await postFormReview(req, res)

    expect(res.statusCode).to.equal(500)
    const data = res._getJSONData()
    expect(data.message).to.equal('Internal server error')
  })
})
