import { expect } from 'chai'
import { MDJ } from 'core/MDJ'

const { parse } = MDJ({
  html: true
})

const testCases = [
  '<div>_content_</div>',
  `<div>
  <div class="inner">
    _content_
  </div>
</div>`,
  `<style type="text/css">
  p {color: #789;}
</style>`,
  `<div>
  <a href="/">home</a></div>`,
  `<div>
line 1

line 2
line 3

line 4
</div>`
]

describe('Block level HTML', () => {
  it('block', () => {
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
