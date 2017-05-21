import { expect } from 'chai'
import { MDJ } from 'core/MDJ'

const {parse} = MDJ()

const autoLink = '<http://example.com>'

describe('Auto links', () => {
  it('link', () => {
    expect(parse(autoLink)).to.eql([
      {
        'type': 'paragraph',
        'children': [
          {
            'type': 'link',
            'href': 'http://example.com',
            'children': [
              {
                'type': 'text',
                'value': 'http://example.com'
              }
            ]
          }
        ]
      }
    ])
  })
})
