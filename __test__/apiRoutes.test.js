const chai = require('chai')
const sinon = require('sinon')
const expect = chai.expect
const proxyquire = require('proxyquire')

describe('Form Router', () => {
  let formValidationStub, personalDetailsControllerStub, addressDetailsControllerStub, reviewDetailsControllerStub, formProgressControllerStub, router

  beforeEach(() => {
    // Stub dependencies first
    formValidationStub = {
      validatePersonalDetails: sinon.stub().callsFake((req, res, next) => next()),
      validateAddressDetails: sinon.stub().callsFake((req, res, next) => next())
    }

    personalDetailsControllerStub = {
      postPersonalDetails: sinon.stub().callsFake((req, res) => res.end())
    }

    addressDetailsControllerStub = {
      postAddressDetails: sinon.stub().callsFake((req, res) => res.end())
    }

    reviewDetailsControllerStub = {
      postFormReview: sinon.stub().callsFake((req, res) => res.end())
    }

    formProgressControllerStub = {
      getFormProgress: sinon.stub().callsFake((req, res) => res.end())
    }

    // Now require the router, injecting the stubs via proxyquire
    router = proxyquire('../routes/apiRoutes', {
      '../validation/formValidation': formValidationStub,
      '../controllers/personalDetailsController': personalDetailsControllerStub,
      '../controllers/addressDetailsController': addressDetailsControllerStub,
      '../controllers/reviewDetailsController': reviewDetailsControllerStub,
      '../controllers/formProgressController': formProgressControllerStub
    })
  })

  function findRoute(path, method) {
    return router.stack.find(
      (layer) => layer.route && layer.route.path === path && layer.route.methods[method]
    )
  }

  it('should have POST /form/save-step-1 with validation and controller', () => {
    const route = findRoute('/form/save-step-1', 'post')
    expect(route).to.exist

    const req = {}
    const res = { end: sinon.spy() }
    const next = sinon.spy()


    route.route.stack[0].handle(req, res, next)
    expect(next.calledOnce).to.be.true
    expect(formValidationStub.validatePersonalDetails.calledOnce).to.be.true

 
    route.route.stack[1].handle(req, res)
    expect(personalDetailsControllerStub.postPersonalDetails.calledOnce).to.be.true
    expect(res.end.calledOnce).to.be.true
  })

  it('should have POST /form/save-step-2 with validation and controller', () => {
    const route = findRoute('/form/save-step-2', 'post')
    expect(route).to.exist

    const req = {}
    const res = { end: sinon.spy() }
    const next = sinon.spy()

    route.route.stack[0].handle(req, res, next)
    expect(next.calledOnce).to.be.true
    expect(formValidationStub.validateAddressDetails.calledOnce).to.be.true

    route.route.stack[1].handle(req, res)
    expect(addressDetailsControllerStub.postAddressDetails.calledOnce).to.be.true
    expect(res.end.calledOnce).to.be.true
  })

  it('should have POST /form/save-step-3 with controller only', () => {
    const route = findRoute('/form/save-step-3', 'post')
    expect(route).to.exist

    expect(route.route.stack).to.have.lengthOf(1)
    expect(route.route.stack[0].handle).to.equal(reviewDetailsControllerStub.postFormReview)
  })

  it('should have GET /form/progress with controller only', () => {
    const route = findRoute('/form/progress', 'get')
    expect(route).to.exist

    expect(route.route.stack).to.have.lengthOf(1)
    expect(route.route.stack[0].handle).to.equal(formProgressControllerStub.getFormProgress)
  })
})
