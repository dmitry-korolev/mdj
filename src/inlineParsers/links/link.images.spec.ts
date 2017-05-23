import { expect } from 'chai'
import { MDJ } from 'core/MDJ'

const { parse } = MDJ()

const alt = '![alt](/md.png "title")'
const blankTitle = '![blank title](/md.png "")'
const manyManyMANYImages = '[![npm](https://img.shields.io/npm/v/mdj.svg)](https://www.npmjs.com/package/mdj) [![Travis](https://img.shields.io/travis/dmitry-korolev/mdj.svg)](https://travis-ci.org/dmitry-korolev/mdj/) [![typescript](https://img.shields.io/badge/written_in-typescript-blue.svg)](https://www.typescriptlang.org/) [![standard](https://img.shields.io/badge/code_style-standard-yellow.svg)](https://standardjs.com/)' // tslint:disable-line max-line-length

describe('Images', () => {
  it('simple link', () => {
    expect(parse(alt)).to.eql([
      {
        type: 'paragraph',
        children: [
          {
            type: 'image',
            src: '/md.png',
            alt: 'alt',
            title: 'title'
          }
        ]
      }
    ])
  })

  it('link in text', () => {
    expect(parse(blankTitle)).to.eql([
      {
        type: 'paragraph',
        children: [
          {
            type: 'image',
            src: '/md.png',
            alt: 'blank title'
          }
        ]
      }
    ])
  })

  it('many linked images', () => {
    expect(parse(manyManyMANYImages)).to.eql([
      {
        type: 'paragraph',
        children: [
          {
            type: 'link',
            href: 'https://www.npmjs.com/package/mdj',
            children: [
              {
                type: 'image',
                src: 'https://img.shields.io/npm/v/mdj.svg',
                alt: 'npm'
              }
            ]
          },
          {
            type: 'text',
            value: ' '
          },
          {
            type: 'link',
            href: 'https://travis-ci.org/dmitry-korolev/mdj/',
            children: [
              {
                type: 'image',
                src: 'https://img.shields.io/travis/dmitry-korolev/mdj.svg',
                alt: 'Travis'
              }
            ]
          },
          {
            type: 'text',
            value: ' '
          },
          {
            type: 'link',
            href: 'https://www.typescriptlang.org/',
            children: [
              {
                type: 'image',
                src: 'https://img.shields.io/badge/written_in-typescript-blue.svg',
                alt: 'typescript'
              }
            ]
          },
          {
            type: 'text',
            value: ' '
          },
          {
            type: 'link',
            href: 'https://standardjs.com/',
            children: [
              {
                type: 'image',
                src: 'https://img.shields.io/badge/code_style-standard-yellow.svg',
                alt: 'standard'
              }
            ]
          }
        ]
      }
    ])
  })
})
