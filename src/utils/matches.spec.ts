/* tslint:disable: no-unused-expression */

import { expect } from 'chai'
import { matches } from './matches'

describe('matches', () => {
  it('should check match', () => {
    expect(matches(/^ $/, '')).to.be.false
    expect(matches(/^ $/, ' ')).to.be.true
  })
})
