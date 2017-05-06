import { expect } from 'chai'
import { parseHR } from './parseHR'

describe('parseHR', () => {
  it('should always return same result', () => {
    expect(parseHR()).to.eql({
      token: { type: 'hr' }
    })
  })
})
