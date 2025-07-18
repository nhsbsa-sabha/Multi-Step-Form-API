// __test__/sessionHelpers.test.js
const { expect } = require('chai')
const { getOrCreateSessionUserId } = require('../helpers/sessionHelpers')

describe('getOrCreateSessionUserId', () => {
  it('should return session id if session exists', () => {
    const req = { session: { id: 'abc123' } }
    const result = getOrCreateSessionUserId(req)
    expect(result).to.equal('abc123')
  })

  it('should return undefined if session exists but id is missing', () => {
    const req = { session: {} } // session without id
    const result = getOrCreateSessionUserId(req)
    expect(result).to.be.undefined
  })
})
