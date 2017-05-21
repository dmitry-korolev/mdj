import { expect } from 'chai'
import { MDJ } from 'core/MDJ'

const { parse } = MDJ()

const simpleTable =
  `header 1 | header 2
-------- | --------
cell 1.1 | cell 1.2
cell 2.1 | cell 2.2

---

header 1 | header 2
:------- | --------
cell 1.1 | cell 1.2
cell 2.1 | cell 2.2`

describe('Simple table', () => {
  it('should parse simple tables', () => {
    expect(parse(simpleTable)).to.eql([
      {
        "type": "table",
        "header": [
          [
            {
              "type": "text",
              "value": "header 1"
            }
          ],
          [
            {
              "type": "text",
              "value": "header 2"
            }
          ]
        ],
        "align": [
          "left",
          "left"
        ],
        "cells": [
          [
            [
              {
                "type": "text",
                "value": "cell 1.1"
              }
            ],
            [
              {
                "type": "text",
                "value": "cell 1.2"
              }
            ]
          ],
          [
            [
              {
                "type": "text",
                "value": "cell 2.1"
              }
            ],
            [
              {
                "type": "text",
                "value": "cell 2.2 "
              }
            ]
          ]
        ]
      },
      {
        "type": "hr"
      },
      {
        "type": "table",
        "header": [
          [
            {
              "type": "text",
              "value": "header 1"
            }
          ],
          [
            {
              "type": "text",
              "value": "header 2"
            }
          ]
        ],
        "align": [
          "left",
          "left"
        ],
        "cells": [
          [
            [
              {
                "type": "text",
                "value": "cell 1.1"
              }
            ],
            [
              {
                "type": "text",
                "value": "cell 1.2"
              }
            ]
          ],
          [
            [
              {
                "type": "text",
                "value": "cell 2.1"
              }
            ],
            [
              {
                "type": "text",
                "value": "cell 2.2"
              }
            ]
          ]
        ]
      }
    ])
  })
})
