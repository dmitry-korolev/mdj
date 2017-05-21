import { expect } from 'chai'
import { MDJ } from 'core/MDJ'

const { parse } = MDJ()

const email = 'my email is <me@example.com>'

describe('Auto linking emails', () => {
  it('email', () => {
    expect(parse(email)).to.eql([
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            value: 'my email is '
          },
          {
            type: 'link',
            href: 'mailto:me@example.com',
            children: [
              {
                type: 'text',
                value: 'me@example.com'
              }
            ]
          }
        ]
      }
    ])
  })
})
