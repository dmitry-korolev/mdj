import { expect } from 'chai'
import { MDJ } from 'core/MDJ'

const {parse} = MDJ()

const h1 =
  `Alt-H1
======`
const h2 =
  `Alt-H2
------`

describe('Normal headings', () => {
  it('h1', () => {
    expect(parse(h1)).to.eql([
      {
        type: 'heading',
        level: 1,
        children: [
          {
            type: 'text',
            value: 'Alt-H1'
          }
        ]
      }
    ])
  })

  it('h2', () => {
    expect(parse(h2)).to.eql([
      {
        type: 'heading',
        level: 2,
        children: [
          {
            type: 'text',
            value: 'Alt-H2'
          }
        ]
      }
    ])
  })
})
