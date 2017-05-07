import { expect } from 'chai'
import { exec } from './exec'

describe('exec', () => {
  it('should execute regExp with string', () => {
    expect(exec(/^ *$/)('')).to.eql(/^ *$/.exec(''))
    expect(exec(/^ *$/, 'test')).to.eql([])
  })
})
