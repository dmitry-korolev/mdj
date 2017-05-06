import { expect } from 'chai'
import { parseSpace } from './parseSpace'

describe('parseSpace', () => {
  it('should always return same result', () => {
    expect(parseSpace()).to.eql({
      token: { type: 'space' }
    })
  })
})
