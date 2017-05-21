import { expect } from 'chai'
import { replace } from './replace'

describe('replace', () => {
  it('should check replace', () => {
    expect(replace(/^ $/, '', '')).to.eql('')
    expect(replace(/^ $/, '', ' ')).to.eql('')
  })
})
