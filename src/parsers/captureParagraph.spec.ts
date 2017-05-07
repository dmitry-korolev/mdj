import { expect } from 'chai'
import { captureParagraph } from './captureParagraph'

describe('captureParagraph', () => {
  it('should try to capture paragraph', () => {
    expect(captureParagraph('', true)).to.be.null
    expect(captureParagraph('test', false)).to.be.null
    expect(captureParagraph('test', true)).be.eql({
      token: {
        type: 'paragraph',
        value: 'test'
      },
      newSource: ''
    })
    expect(captureParagraph('wtf\nwtf\n\ntest', true)).to.eql({
      token: {
        type: 'paragraph',
        value: 'wtf\nwtf'
      },
      newSource: 'test'
    })
  })
})
