import { expect } from 'chai'
import { equals } from './equals'

describe('equals', () => {
  it('should check equality', () => {
    expect(equals('')('')).to.be.true
    expect(equals('123')('321')).to.be.false
  })
})
