import { expect } from 'chai'
import { MDJ } from 'core/MDJ'

const { parse } = MDJ({
  html: true
})

const codeBlockFences = `\`\`\`
<?php

$message = 'fenced code block';
echo $message;
\`\`\``

const codeBlockTildas = `~~~
tilde
~~~`

const codeBlockLang = `\`\`\`php
echo 'language identifier';
\`\`\``

describe('Code fenced', () => {
  it('block fenced', () => {
    expect(parse(codeBlockFences)).to.eql([
      {
        type: 'codeblock',
        value: '<?php\n\n$message = \'fenced code block\';\necho $message;'
      }
    ])
  })

  it('block tilded (sorry)', () => {
    expect(parse(codeBlockTildas)).to.eql([
      {
        type: 'codeblock',
        value: 'tilde'
      }
    ])
  })

  it('block with lang', () => {
    expect(parse(codeBlockLang)).to.eql([
      {
        type: 'codeblock',
        value: 'echo \'language identifier\';',
        language: 'php'
      }
    ])
  })
})
