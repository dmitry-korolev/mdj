import { expect } from 'chai'
import { MDJ } from 'core/MDJ'

const {parse} = MDJ()

const gfmTable =
  `Markdown | Less | Pretty
--- | --- | ---
*Still* | \`renders\` | **nicely**
1 | 2 | 3`

describe('GFM table', () => {
  it('should parse GFM tables', () => {
    expect(parse(gfmTable)).to.eql([
      {
        type: 'table',
        header: [
          [
            {
              type: 'text',
              value: 'Markdown'
            }
          ],
          [
            {
              type: 'text',
              value: 'Less'
            }
          ],
          [
            {
              type: 'text',
              value: 'Pretty'
            }
          ]
        ],
        align: [
          'left',
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
                    value: 'Still'
                  }
                ]
              }
            ],
            [
              {
                type: 'code',
                value: 'renders'
              }
            ],
            [
              {
                type: 'strong',
                children: [
                  {
                    type: 'text',
                    value: 'nicely'
                  }
                ]
              }
            ]
          ],
          [
            [
              {
                type: 'text',
                value: '1'
              }
            ],
            [
              {
                type: 'text',
                value: '2'
              }
            ],
            [
              {
                type: 'text',
                value: '3'
              }
            ]
          ]
        ]
      }
    ])
  })
})








