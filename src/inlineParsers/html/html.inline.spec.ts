import { expect } from 'chai'
import { MDJ } from 'core/MDJ'

const { parse } = MDJ({
  html: true
})

const inlineHtml = 'an <b>important</b> <a href=\'\'>link</a>'
const brokenLine = `broken<br/>
line`
const beginning = '<b>inline tag</b> at the beginning'
const inlineFormatting = '<span>http://example.com</span>'

describe('Inline html', () => {
  it('an important link', () => {
    expect(parse(inlineHtml)).to.eql([
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            value: 'an '
          },
          {
            type: 'html',
            value: '<b>important</b>'
          },
          {
            type: 'text',
            value: ' '
          },
          {
            type: 'html',
            value: '<a href=\'\'>link</a>'
          }
        ]
      }
    ])
  })

  it('inline broken line', () => {
    expect(parse(brokenLine)).to.eql([
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            value: 'broken'
          },
          {
            type: 'html',
            value: '<br/>'
          },
          {
            type: 'br'
          },
          {
            type: 'text',
            value: 'line'
          }
        ]
      }
    ])
  })

  it('inline tag at the beginning', () => {
    expect(parse(beginning)).to.eql([
      {
        type: 'paragraph',
        children: [
          {
            type: 'html',
            value: '<b>inline tag</b>'
          },
          {
            type: 'text',
            value: ' at the beginning'
          }
        ]
      }
    ])
  })

  it('inline formatting', () => {
    expect(parse(inlineFormatting)).to.eql([
      {
        type: 'paragraph',
        children: [
          {
            type: 'html',
            value: '<span>http://example.com</span>'
          }
        ]
      }
    ])
  })
})
