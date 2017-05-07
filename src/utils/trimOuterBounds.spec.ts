import { expect } from 'chai'
import { trimOuterBounds } from './trimOuterBounds'

describe('trimOuterBounds', () => {
  it('should trim unnecessary stuff from table row', () => {
    expect(trimOuterBounds('test')).to.equal('test')
    expect(trimOuterBounds('|test')).to.equal('test')
    expect(trimOuterBounds('test     |')).to.equal('test')
    expect(trimOuterBounds('| test   |    sadasd |')).to.equal('test   |    sadasd')
  })
})
