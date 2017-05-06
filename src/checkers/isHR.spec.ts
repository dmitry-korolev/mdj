import { expect } from 'chai'
import { isHR } from './isHR'

describe('isHR', () => {
  it('should check if line is horizontal rule', () => {
    expect(isHR('---')).to.be.true
    expect(isHR('***')).to.be.true
    expect(isHR('___')).to.be.true
    expect(isHR('------')).to.be.true
    expect(isHR('***____')).to.be.false
    expect(isHR('*_-___')).to.be.false
    expect(isHR('  ---')).to.be.true
    expect(isHR('***  ')).to.be.true
    expect(isHR('  ___  ')).to.be.true
    expect(isHR('  ___  T')).to.be.false
    expect(isHR('T  ___  ')).to.be.false
    expect(isHR('')).to.be.false
  })
})
