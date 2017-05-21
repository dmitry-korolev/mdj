import { expect } from 'chai'
import { split } from './split'

describe('split', () => {
  it('should check split', () => {
    expect(split(/^ $/, '    ')).to.eql(['    '])
    expect(split(/ /, ' ')).to.eql(['', ''])
  })
})
