import { expect } from 'chai'
import { isBlockquote } from './isBlockquote'

describe('isBlockquote', () => {
  it('should return boolean', () => {
    expect(isBlockquote('>')).to.equal(true)
    expect(isBlockquote(' >')).to.equal(true)
    expect(isBlockquote('   >   ')).to.equal(true)
    expect(isBlockquote(' as')).to.equal(false)
    expect(isBlockquote(' as')).to.equal(false)
    expect(isBlockquote(' < asd')).to.equal(false)
  })
})
