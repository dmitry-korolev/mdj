import { expect } from 'chai'
import { MDJ } from 'core/MDJ'

const { parse } = MDJ({
  html: true
})

const htmlEntities = '&amp; &copy; &#123;'

describe('HTML entities', () => {
  it('simple', () => {
    expect(parse(htmlEntities)).to.eql([
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            value: '&amp; &copy; &#123;'
          }
        ]
      }
    ])
  })
})
