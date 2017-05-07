import { expect } from 'chai'
import { captureHeading } from './captureHeading'

describe('captureHeading', () => {
  it('should return token', () => {
    const testCases = [
      {
        input: '### Header 3',
        output: {
          level: 3,
          value: 'Header 3'
        }
      },{
        input: '### Header 3',
        output: {
          level: 3,
          value: 'Header 3'
        }
      },{
        input: '## Header 2',
        output: {
          level: 2,
          value: 'Header 2'
        }
      },{
        input: '##### Header 6 ### 333',
        output: {
          level: 5,
          value: 'Header 6 ### 333'
        }
      }
    ]

    testCases.forEach(({ input, output }) => {
      expect(captureHeading(input)).to.eql({
        token: {
          type: 'heading',
          ...output
        }
      })
    })
  })
})
