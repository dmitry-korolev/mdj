import { expect } from 'chai'
import { MDJ } from 'core/MDJ'

const { parse } = MDJ({
  html: true
})

const simple = '<!-- single line -->'
const multiline = `<!-- 
  multiline -->`

describe('HTML comments', () => {
  it('simple', () => {
    expect(parse(simple)).to.eql([
      {
        type: 'html',
        value: simple
      }
    ])
  })

  it('multiline', () => {
    expect(parse(multiline)).to.eql([
      {
        type: 'html',
        value: multiline
      }
    ])
  })
})
