import { expect } from 'chai'
import { MDJ } from 'core/MDJ'

const { parse } = MDJ()

const singleQuotes = '[single quotes](http://example.com \'Title\')'
const doubleQuotes = '[double quotes](http://example.com "Title")'
const singleQuotesBlank = '[single quotes blank](http://example.com \'\')'
const doubleQuotesBlank = '[double quotes blank](http://example.com "")'
const space = '[space](http://example.com "2 Words")'
const parenthesis = '[parentheses](http://example.com/url-(parentheses) "Title")'

describe('Link titles', () => {
  it('single quotes', () => {
    expect(parse(singleQuotes)).to.eql([
      {
        type: 'paragraph',
        children: [
          {
            type: 'link',
            href: 'http://example.com',
            title: 'Title',
            children: [
              {
                type: 'text',
                value: 'single quotes'
              }
            ]
          }
        ]
      }
    ])
  })

  it('double quotes', () => {
    expect(parse(doubleQuotes)).to.eql([
      {
        type: 'paragraph',
        children: [
          {
            type: 'link',
            href: 'http://example.com',
            title: 'Title',
            children: [
              {
                type: 'text',
                value: 'double quotes'
              }
            ]
          }
        ]
      }
    ])
  })

  it('empty single quotes', () => {
    expect(parse(singleQuotesBlank)).to.eql([
      {
        type: 'paragraph',
        children: [
          {
            type: 'link',
            href: 'http://example.com',
            children: [
              {
                type: 'text',
                value: 'single quotes blank'
              }
            ]
          }
        ]
      }
    ])
  })

  it('empty double quotes', () => {
    expect(parse(doubleQuotesBlank)).to.eql([
      {
        type: 'paragraph',
        children: [
          {
            type: 'link',
            href: 'http://example.com',
            children: [
              {
                type: 'text',
                value: 'double quotes blank'
              }
            ]
          }
        ]
      }
    ])
  })

  it('space', () => {
    expect(parse(space)).to.eql([
      {
        type: 'paragraph',
        children: [
          {
            type: 'link',
            href: 'http://example.com',
            title: '2 Words',
            children: [
              {
                type: 'text',
                value: 'space'
              }
            ]
          }
        ]
      }
    ])
  })

  it('parenthesis', () => {
    expect(parse(parenthesis)).to.eql([
      {
        type: 'paragraph',
        children: [
          {
            type: 'link',
            href: 'http://example.com/url-(parentheses)',
            title: 'Title',
            children: [
              {
                type: 'text',
                value: 'parentheses'
              }
            ]
          }
        ]
      }
    ])
  })
})
