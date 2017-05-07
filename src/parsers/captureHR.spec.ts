import { expect } from 'chai'
import { captureHR } from './captureHR'

describe('captureHR', () => {
  it('should always return same result', () => {
    expect(captureHR('')).to.eql({
      token: { type: 'hr' }
    })
  })
})
