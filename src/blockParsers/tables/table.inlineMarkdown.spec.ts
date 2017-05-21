import { expect } from 'chai'
import { MDJ } from 'core/MDJ'

const {parse} = MDJ()

const inlineMarkdownTable =
  `| _header_ 1     | header 2      |
| -------------- | ------------- |
| _cell_ 1.1     | ~~cell~~ 1.2  |
| \`|\` 2.1      | \\| 2.2       |
| \`\\|\` 3.1     | [link](/) 3.2 |`

describe('Table with inline markdown', () => {
  it('should parse inlineMarkdown tables', () => {
    expect(parse(inlineMarkdownTable)).to.eql([
      {
        type: 'table',
        header: [
          [
            {
              type: 'em',
              children: [
                {
                  type: 'text',
                  value: 'header'
                }
              ]
            },
            {
              type: 'text',
              value: ' 1'
            }
          ],
          [
            {
              type: 'text',
              value: 'header 2'
            }
          ]
        ],
        align: [
          'left',
          'left'
        ],
        cells: [
          [
            [
              {
                type: 'em',
                children: [
                  {
                    type: 'text',
                    value: 'cell'
                  }
                ]
              },
              {
                type: 'text',
                value: ' 1.1'
              }
            ],
            [
              {
                type: 'strikethrough',
                children: [
                  {
                    type: 'text',
                    value: 'cell'
                  }
                ]
              },
              {
                type: 'text',
                value: ' 1.2'
              }
            ]
          ],
          [
            [
              {
                type: 'code',
                value: '|'
              },
              {
                type: 'text',
                value: ' 2.1'
              }
            ],
            [
              {
                type: 'text',
                value: '\\|'
              },
              {
                type: 'text',
                value: ' 2.2'
              }
            ]
          ],
          [
            [
              {
                type: 'code',
                value: '\\|'
              },
              {
                type: 'text',
                value: ' 3.1'
              }
            ],
            [
              {
                type: 'link',
                href: '/',
                children: [
                  {
                    type: 'text',
                    value: 'link'
                  }
                ]
              },
              {
                type: 'text',
                value: ' 3.2'
              }
            ]
          ]
        ]
      }
    ])
  })
})
