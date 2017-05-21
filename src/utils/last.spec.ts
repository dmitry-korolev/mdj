/* tslint:disable: no-unused-expression */

import { expect } from 'chai'
import { last } from './last'

describe('last', () => {
  it('should get last item from array', () => {
    expect(last([1, 2, 3])).to.equal(3)
    expect(last([])).to.be.undefined
  })
})
