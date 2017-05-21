import { expect } from 'chai'
import { match } from './match'

describe('match', () => {
  it('should check match', () => {
    expect(match(/^ $/, '')).to.eql([])
    expect(match(/^ $/, ' ')).to.eql(' '.match(/^ $/))
  })
})
