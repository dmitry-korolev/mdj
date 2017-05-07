import { expect } from 'chai'
import { captureHR } from './captureHR'

describe('captureHR', () => {
  it('should pick HR token', () => {
    expect(captureHR('')).to.be.null
    expect(captureHR('---')).to.eql({
      token: {
        type: 'hr'
      },
      newSource: ''
    })
  })
})
