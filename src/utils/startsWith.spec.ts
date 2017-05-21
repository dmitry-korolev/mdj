/* tslint:disable: no-unused-expression */

import { expect } from 'chai'
import { startsWith } from './startsWith'

describe('startsWith', () => {
  it('should implement String.prototype.startsWith', () => {
    expect(startsWith('test', 'testtest')).to.be.true
    expect(startsWith('test', 'ttesttest')).to.be.false
    expect(startsWith('testtest', 't')).to.be.false
  })
})
