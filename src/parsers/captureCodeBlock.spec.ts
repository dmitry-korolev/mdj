import { expect } from 'chai'
import { captureCodeBlock } from './captureCodeBlock'

xdescribe('captureCodeBlock', () => {
  it('should parse code blocks', () => {
    expect(captureCodeBlock('')).to.eql({
      token: {
        type: 'codeblock',
        language: 'js',
        value: 'asdsads\nasdsads\n12312\n\n\n123'
      },
      skip: 8
    })
  })
})
