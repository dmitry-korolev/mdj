import { expect } from 'chai'
import { captureCodeBlock } from './captureCodeBlock'

describe('captureCodeBlock', () => {
  it('should parse code blocks', () => {
    expect(captureCodeBlock('')).to.be.null
    expect(captureCodeBlock('```js\ntest\n```\ntest')).to.eql({
      token: {
        type: 'codeblock',
        language: 'js',
        value: 'test'
      },
      newSource: 'test'
    })
  })
})
