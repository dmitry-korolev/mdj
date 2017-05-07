import { expect } from 'chai'
import { captureTable } from './captureTable'

describe('captureTable', () => {
  it('should try to capture paragraph', () => {
    expect(captureTable('', true)).to.be.null
    expect(captureTable('test', false)).to.be.null
    expect(captureTable('test', true)).be.null
    expect(captureTable('| test | test |\n|---|---|\n|cell|cell|', false)).be.null
    expect(captureTable('| test | test |\n|---|---|\n|cell|cell|', true)).be.eql({
      token: {
        type: 'table',
        header: ['test', 'test'],
        align: [null, null],
        cells: [['cell', 'cell']]
      },
      newSource: ''
    })
    expect(captureTable(' test | test \n---|---\ncell|cell', true)).be.eql({
      token: {
        type: 'table',
        header: ['test', 'test'],
        align: [null, null],
        cells: [['cell', 'cell']]
      },
      newSource: ''
    })
  })
})
