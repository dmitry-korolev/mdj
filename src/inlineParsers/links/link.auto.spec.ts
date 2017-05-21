import { expect } from 'chai'
import { MDJ } from 'core/MDJ'

const { parse } = MDJ()

const autoLink = '<http://example.com>'
const autoLinkText = 'an autolink http://example.com'
const toughText = 'inside of brackets [http://example.com], inside of braces {http://example.com},  inside of parentheses (http://example.com)'
const trailing = 'trailing slash http://example.com/ and http://example.com/path/'

describe('Auto linking', () => {
  it('simple link', () => {
    expect(parse(autoLink)).to.eql([
      {
        type: 'paragraph',
        children: [
          {
            type: 'link',
            href: 'http://example.com',
            children: [
              {
                type: 'text',
                value: 'http://example.com'
              }
            ]
          }
        ]
      }
    ])
  })

  it('link in text', () => {
    expect(parse(autoLinkText)).to.eql([
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            value: 'an autolink '
          },
          {
            type: 'link',
            href: 'http://example.com',
            children: [
              {
                type: 'text',
                value: 'http://example.com'
              }
            ]
          }
        ]
      }
    ])
  })

  it('braced links in text', () => {
    expect(parse(toughText)).to.eql([
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            value: 'inside of brackets '
          },
          {
            type: 'text',
            value: '['
          },
          {
            type: 'link',
            href: 'http://example.com',
            children: [
              {
                type: 'text',
                value: 'http://example.com'
              }
            ]
          },
          {
            type: 'text',
            value: '], inside of braces {'
          },
          {
            type: 'link',
            href: 'http://example.com',
            children: [
              {
                type: 'text',
                value: 'http://example.com'
              }
            ]
          },
          {
            type: 'text',
            value: '},  inside of parentheses ('
          },
          {
            type: 'link',
            href: 'http://example.com',
            children: [
              {
                type: 'text',
                value: 'http://example.com'
              }
            ]
          },
          {
            type: 'text',
            value: ')'
          }
        ]
      }
    ])
  })

  it('links with trailing slashes', () => {
    expect(parse(trailing)).to.eql([
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            value: 'trailing slash '
          },
          {
            type: 'link',
            href: 'http://example.com/',
            children: [
              {
                type: 'text',
                value: 'http://example.com/'
              }
            ]
          },
          {
            type: 'text',
            value: ' and '
          },
          {
            type: 'link',
            href: 'http://example.com/path/',
            children: [
              {
                type: 'text',
                value: 'http://example.com/path/'
              }
            ]
          }
        ]
      }
    ])
  })
})
