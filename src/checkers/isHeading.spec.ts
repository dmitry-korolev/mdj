import { expect } from 'chai'
import { isHeading } from './isHeading'

describe('isHeading', () => {
  it('should check if line is heading', () => {
    expect(isHeading('')).to.be.false
    expect(isHeading('### ')).to.be.false
    expect(isHeading('### Heading')).to.be.true
    expect(isHeading('   ## ')).to.be.false
  })
})
