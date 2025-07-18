const { expect } = require('chai')
const { saveStep, getProgress, resetStorage } = require('../storage/formStorage')

describe('formProgressStorage', () => {
  const sessionId = 'test-session'

  beforeEach(() => {
    resetStorage()
  })

  it('should save and get step 1 personal details', () => {
    const personalData = { firstName: 'Alice', lastName: 'Smith', email: 'alice@example.com' }
    saveStep(sessionId, 1, personalData)

    const progress = getProgress(sessionId)
    expect(progress).to.exist
    expect(progress.currentStep).to.equal(1)
    expect(progress.personalDetails).to.deep.equal(personalData)
  })

  it('should update currentStep to highest value', () => {
    saveStep(sessionId, 1, { firstName: 'Bob' })
    saveStep(sessionId, 2, { city: 'NYC' })

    const progress = getProgress(sessionId)
    expect(progress.currentStep).to.equal(2)
  })

  it('should save and merge address details at step 2', () => {
    saveStep(sessionId, 1, { firstName: 'Carol' })
    saveStep(sessionId, 2, { city: 'LA', postCode: '90001' })

    const progress = getProgress(sessionId)
    expect(progress.addressDetails).to.deep.equal({ city: 'LA', postCode: '90001' })

    saveStep(sessionId, 2, { street: 'Main St' })
    expect(progress.addressDetails).to.deep.equal({ city: 'LA', postCode: '90001', street: 'Main St' })
  })

  it('should save completeFormData at step 3', () => {
    const personal = { firstName: 'Dan', lastName: 'Brown', email: 'dan@example.com' }
    const address = { street: '1st Ave', city: 'Boston', postCode: '02118' }

    saveStep(sessionId, 1, personal)
    saveStep(sessionId, 2, address)
    saveStep(sessionId, 3, {})

    const progress = getProgress(sessionId)
    expect(progress.completeFormData).to.deep.equal({
      personalDetails: personal,
      addressDetails: address
    })
  })

  it('should return null for unknown sessionId', () => {
    const progress = getProgress('unknown-session')
    expect(progress).to.be.null
  })
})
