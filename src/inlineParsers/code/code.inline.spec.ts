import { expect } from 'chai'
import { MDJ } from 'core/MDJ'

const { parse } = MDJ({
  html: true
})

const codeSpan = 'a `code span`'
const trailingText = '`this is also a codespan` trailing text'
const allCode = '`and look at this one!`'
const lonelyBacktick = 'single backtick in a code span: `` ` ``'
const recursive = 'backtick-delimited string in a code span: `` `foo` ``'
const insane = '`sth `` sth`'

describe('Inline code', () => {
  it('a code span', () => {
    expect(parse(codeSpan)).to.eql([
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            value: 'a '
          },
          {
            type: 'code',
            value: 'code span'
          }
        ]
      }
    ])
  })

  it('this is also a codespan trailing text', () => {
    expect(parse(trailingText)).to.eql([
      {
        type: 'paragraph',
        children: [
          {
            type: 'code',
            value: 'this is also a codespan'
          },
          {
            type: 'text',
            value: ' trailing text'
          }
        ]
      }
    ])
  })

  it('and look at this one!', () => {
    expect(parse(allCode)).to.eql([
      {
        type: 'paragraph',
        children: [
          {
            type: 'code',
            value: 'and look at this one!'
          }
        ]
      }
    ])
  })

  it('single backtick in a code span', () => {
    expect(parse(lonelyBacktick)).to.eql([
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            value: 'single backtick in a code span: '
          },
          {
            type: 'code',
            value: '` '
          }
        ]
      }
    ])
  })

  it('backtick-delimited string in a code span', () => {
    expect(parse(recursive)).to.eql([
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            value: 'backtick-delimited string in a code span: '
          },
          {
            type: 'code',
            value: '`foo` '
          }
        ]
      }
    ])
  })

  it('insane', () => {
    expect(parse(insane)).to.eql([
      {
        type: 'paragraph',
        children: [
          {
            type: 'code',
            value: 'sth `` sth'
          }
        ]
      }
    ])
  })
})
