import { expect } from 'chai'
import { MDJ } from 'core/MDJ'

const { parse } = MDJ()

const h1 = '# h1'
const h2 = '## h2'
const h3 = '### h3'
const h4 = '#### h4'
const h5 = '##### h5'
const h6 = '###### h6'
const notHeading = '####### not a heading'
const enclosed = '# closed h1 #'
const onlyHash = '#'

describe('Normal headings', () => {
  it('h1', () => {
    expect(parse(h1)).to.eql([
      {
        "type": "heading",
        "level": 1,
        "children": [
          {
            "type": "text",
            "value": "h1"
          }
        ]
      }
    ])
  })

  it('h2', () => {
    expect(parse(h2)).to.eql([
      {
        "type": "heading",
        "level": 2,
        "children": [
          {
            "type": "text",
            "value": "h2"
          }
        ]
      }
    ])
  })

  it('h3', () => {
    expect(parse(h3)).to.eql([
      {
        "type": "heading",
        "level": 3,
        "children": [
          {
            "type": "text",
            "value": "h3"
          }
        ]
      }
    ])
  })

  it('h4', () => {
    expect(parse(h4)).to.eql([
      {
        "type": "heading",
        "level": 4,
        "children": [
          {
            "type": "text",
            "value": "h4"
          }
        ]
      }
    ])
  })

  it('h5', () => {
    expect(parse(h5)).to.eql([
      {
        "type": "heading",
        "level": 5,
        "children": [
          {
            "type": "text",
            "value": "h5"
          }
        ]
      }
    ])
  })

  it('h6', () => {
    expect(parse(h6)).to.eql([
      {
        "type": "heading",
        "level": 6,
        "children": [
          {
            "type": "text",
            "value": "h6"
          }
        ]
      }
    ])
  })

  it('not a heading', () => {
    expect(parse(notHeading)).to.eql([
      {
        "type": "paragraph",
        "children": [
          {
            "type": "text",
            "value": "####### not a heading"
          }
        ]
      }
    ])
  })

  it('enclosed', () => {
    expect(parse(enclosed)).to.eql([
      {
        "type": "heading",
        "level": 1,
        "children": [
          {
            "type": "text",
            "value": "closed h1"
          }
        ]
      }
    ])
  })

  it('only hash', () => {
    expect(parse(onlyHash)).to.eql([
      {
        "type": "paragraph",
        "children": [
          {
            "type": "text",
            "value": "#"
          }
        ]
      }
    ])
  })
})
