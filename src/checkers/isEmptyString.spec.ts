import { expect } from 'chai'
import { isEmptyString } from './isEmptyString'

describe('isEmptyString', () => {
  it('should check if string is empty', () => {
    expect(isEmptyString('')).to.be.true
    expect(isEmptyString(123)).to.be.false
    expect(isEmptyString('adsadsa')).to.be.false
  })
})
