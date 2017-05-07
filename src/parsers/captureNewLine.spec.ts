import { expect } from 'chai'
import { captureNewLine } from './captureNewLine'

describe('captureNewLine', () => {
  it('should try to capture new line', () => {
    expect(captureNewLine('')).to.be.null
    expect(captureNewLine('test')).be.null
    expect(captureNewLine('\n\n\n\ntest\n\n\n')).to.eql({
      token: {
        type: 'space'
      },
      newSource: 'test\n\n\n'
    })
  })
})
