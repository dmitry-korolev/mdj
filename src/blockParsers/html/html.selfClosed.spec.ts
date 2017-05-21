import { expect } from 'chai'
import { MDJ } from 'core/MDJ'

const { parse } = MDJ({
  html: true
})

const testCases = [
  '<hr>',
  '<hr/>',
  '<hr />',
  '<hr class="foo" id="bar" />',
  '<hr class="foo" id="bar"/>',
  '<hr class="foo" id="bar" >'
]

describe('HTML self-closed tags', () => {
  it('hr', () => {
    testCases.forEach((test) => {
      expect(parse(test)).to.eql([
        {
          type: 'html',
          value: test
        }
      ])
    })
  })
})
