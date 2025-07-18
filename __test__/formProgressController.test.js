const chai = require('chai')
const sinon = require('sinon')
const expect = chai.expect
const httpMocks = require('node-mocks-http')
const proxyquire = require('proxyquire')

describe('getFormProgress', () => {
  let getFormProgress, formStorageStub, sessionHelpersStub, req, res

  beforeEach(() => {
    formStorageStub = {
      getProgress: sinon.stub()
    }
    sessionHelpersStub = {
      getOrCreateSessionUserId: sinon.stub()
    }


    const controller = proxyquire('../controllers/formProgressController', {
      '../storage/formStorage': formStorageStub,
      '../helpers/sessionHelpers': sessionHelpersStub
    })
    getFormProgress = controller.getFormProgress

    req = httpMocks.createRequest()
    res = httpMocks.createResponse()

    sessionHelpersStub.getOrCreateSessionUserId.returns('fake-user-id')
  })

  it('should get progress for the user and send it in response', async () => {
    const fakeProgress = { step: 2, data: { some: 'info' } }
    formStorageStub.getProgress.returns(fakeProgress)

    await getFormProgress(req, res)

    expect(sessionHelpersStub.getOrCreateSessionUserId.calledOnceWith(req)).to.be.true
    expect(formStorageStub.getProgress.calledOnceWith('fake-user-id')).to.be.true

    expect(res.statusCode).to.equal(200)
    const data = res._getJSONData()
   expect(data).to.have.property('progress')
    expect(data.progress).to.deep.equal(fakeProgress)
  })
})
