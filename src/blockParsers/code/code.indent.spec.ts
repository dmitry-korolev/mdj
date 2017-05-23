import { expect } from 'chai'
import { MDJ } from 'core/MDJ'

const { parse } = MDJ({
  html: true
})

const codeBlockA = `    <?php

    $message = 'Hello World!';
    echo $message;`

const codeBlockB = `    > not a quote
    - not a list item
    [not a link](http://example.com)`

const codeBlockTabbed = `	<?php

	$message = 'Hello World!';
	echo $message;

	echo "following a blank line";`

describe('Code indented', () => {
  it('block A', () => {
    expect(parse(codeBlockA)).to.eql([
      {
        type: 'codeblock',
        value: '<?php\n\n$message = \'Hello World!\';\necho $message;'
      }
    ])
  })

  it('block B', () => {
    expect(parse(codeBlockB)).to.eql([
      {
        type: 'codeblock',
        value: '> not a quote\n- not a list item\n[not a link](http://example.com)'
      }
    ])
  })

  it('block tabbed', () => {
    expect(parse(codeBlockTabbed)).to.eql([
      {
        type: 'codeblock',
        value: '<?php\n\n$message = \'Hello World!\';\necho $message;\n\necho "following a blank line";'
      }
    ])
  })
})
