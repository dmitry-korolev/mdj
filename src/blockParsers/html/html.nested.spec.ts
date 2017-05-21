import { expect } from 'chai'
import { MDJ } from 'core/MDJ'

const { parse } = MDJ({
  html: true
})

const htmlNested = `<div>
_parent_
<div>
_child_
</div>
<pre>
_adopted child_
</pre>
</div>`

describe('HTML nested', () => {
  it('nested', () => {
    expect(parse(htmlNested)).to.eql([
      {
        type: 'html',
        value: htmlNested
      }
    ])
  })
})
