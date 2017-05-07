import { expect } from 'chai'
import { captureBlockquote } from './captureBlockquote'

describe('captureBlockquote', () => {
  it('should capture blockquote token', () => {
    expect(captureBlockquote('')).to.be.null
    expect(captureBlockquote('> test\n> test')).to.eql({
      token: {
        type: 'blockquote',
        children: []
      },
      inner: 'test\ntest',
      newSource: ''
    })
  })
})
