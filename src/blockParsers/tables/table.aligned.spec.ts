import { expect } from 'chai'
import { MDJ } from 'core/MDJ'

const {parse} = MDJ()

const alignedTable =
  `| header 1 | header 2 | header 3 |
| :------- | :------: | -------: |
| cell 1.1 | cell 1.2 | cell 1.3 |
| cell 2.1 | cell 2.2 | cell 2.3 |`

describe('Aligned table', () => {
  it('should parse aligned tables', () => {
    expect(parse(alignedTable)).to.eql([{
      type: 'table',
      header: [
        [
          {
            type: 'text',
            value: 'header 1'
          }
        ],
        [
          {
            type: 'text',
            value: 'header 2'
          }
        ],
        [
          {
            type: 'text',
            value: 'header 3'
          }
        ]
      ],
      align: [
        'left',
        'center',
        'right'
      ],
      cells: [
        [
          [
            {
              type: 'text',
              value: 'cell 1.1'
            }
          ],
          [
            {
              type: 'text',
              value: 'cell 1.2'
            }
          ],
          [
            {
              type: 'text',
              value: 'cell 1.3'
            }
          ]
        ],
        [
          [
            {
              type: 'text',
              value: 'cell 2.1'
            }
          ],
          [
            {
              type: 'text',
              value: 'cell 2.2'
            }
          ],
          [
            {
              type: 'text',
              value: 'cell 2.3'
            }
          ]
        ]
      ]
    }])
  })
})
