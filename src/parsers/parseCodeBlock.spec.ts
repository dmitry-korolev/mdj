import { expect } from 'chai'
import { parseCodeBlock } from './parseCodeBlock'

describe('parseCodeBlock', () => {
  it('should parse code blocks', () => {
    const exampleInputA = [
      'check',
      'check',
      'check',
      'check',
      '```js',
      'asdsads',
      'asdsads',
      '12312',
      '',
      '',
      '123',
      '```'
    ]

    expect(parseCodeBlock(exampleInputA, 4)).to.eql({
      token: {
        type: 'codeblock',
        language: 'js',
        value: 'asdsads\nasdsads\n12312\n\n\n123'
      },
      skip: 8
    })
  })
})
