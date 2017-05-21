import { expect } from 'chai'
import { MDJ } from 'core/MDJ'

const { parse } = MDJ()

const alt = '![alt](/md.png "title")'
const blankTitle = '![blank title](/md.png "")'

describe('Auto linking', () => {
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
})
