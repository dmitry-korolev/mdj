import { expect } from 'chai'
import { isCodeBlock } from './isCodeBlock'

describe('isCodeBlock', () => {
  it('should check if line starts a code block', () => {
    expect(isCodeBlock(' ```')).to.be.true
    expect(isCodeBlock('```js')).to.be.true
    expect(isCodeBlock('```   test')).to.be.true
    expect(isCodeBlock('test')).to.be.false
    expect(isCodeBlock('test ```')).to.be.false
    expect(isCodeBlock('t```')).to.be.false
  })
})
