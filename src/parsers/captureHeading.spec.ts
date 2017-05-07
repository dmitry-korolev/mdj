import { expect } from 'chai'
import { captureHeading } from './captureHeading'

describe('captureHeading', () => {
  it('should return parsed heading token', () => {
    expect(captureHeading('### Heading 3')).to.eql({
      token: {
        type: 'heading',
        level: 3,
        value: 'Heading 3'
      },
      newSource: ''
    })

    expect(captureHeading('Heading 3\n---')).to.eql({
      token: {
        type: 'heading',
        level: 2,
        value: 'Heading 3'
      },
      newSource: ''
    })
  })
})
