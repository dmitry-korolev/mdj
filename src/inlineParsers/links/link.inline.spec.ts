import { expect } from 'chai'
import { MDJ } from 'core/MDJ'

const { parse } = MDJ()

const inlineLink = '[link](http://example.com)'
const parenLink = '[link](/url-(parentheses)) with parentheses in URL '
const inParenLink = '([link](/index.php)) in parentheses'
const codeLink = '[`link`](http://example.com)'
const image = '[![MD Logo](http://parsedown.org/md.png)](http://example.com)'
const imageAndText = '[![MD Logo](http://parsedown.org/md.png) and text](http://example.com)'

describe('Auto links', () => {
  it('inline link', () => {
    expect(parse(inlineLink)).to.eql([
      {
        type: 'paragraph',
        children: [
          {
            type: 'link',
            href: 'http://example.com',
            children: [
              {
                type: 'text',
                value: 'link'
              }
            ]
          }
        ]
      }
    ])
  })

  it('inline link with parenthesis in url', () => {
    expect(parse(parenLink)).to.eql([
      {
        type: 'paragraph',
        children: [
          {
            type: 'link',
            href: '/url-(parentheses)',
            children: [
              {
                type: 'text',
                value: 'link'
              }
            ]
          },
          {
            type: 'text',
            value: ' with parentheses in URL '
          }
        ]
      }
    ])
  })

  it('inline link inside parenthesis', () => {
    expect(parse(inParenLink)).to.eql([
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            value: '('
          },
          {
            type: 'link',
            href: '/index.php',
            children: [
              {
                type: 'text',
                value: 'link'
              }
            ]
          },
          {
            type: 'text',
            value: ') in parentheses'
          }
        ]
      }
    ])
  })

  it('markdown inside link', () => {
    expect(parse(codeLink)).to.eql([
      {
        type: 'paragraph',
        children: [
          {
            type: 'link',
            href: 'http://example.com',
            children: [
              {
                type: 'code',
                value: 'link'
              }
            ]
          }
        ]
      }
    ])
  })

  it('link with image', () => {
    expect(parse(image)).to.eql([
      {
        type: 'paragraph',
        children: [
          {
            type: 'link',
            href: 'http://example.com',
            children: [
              {
                type: 'image',
                src: 'http://parsedown.org/md.png',
                alt: 'MD Logo'
              }
            ]
          }
        ]
      }
    ])
  })

  it('link with image and text', () => {
    expect(parse(imageAndText)).to.eql([
      {
        type: 'paragraph',
        children: [
          {
            type: 'link',
            href: 'http://example.com',
            children: [
              {
                type: 'image',
                src: 'http://parsedown.org/md.png',
                alt: 'MD Logo'
              },
              {
                type: 'text',
                value: ' and text'
              }
            ]
          }
        ]
      }
    ])
  })
})
