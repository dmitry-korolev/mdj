import { expect } from 'chai'
import { clearSource } from './clearSource'

describe('clearSource', () => {
  it('should, well, clear source', () => {
    expect(clearSource('       ')).to.equal('')
    expect(clearSource(`    \n     \n    \n`)).to.equal('\n\n\n')
    expect(clearSource(`  		   `)).to.equal('')
  })
})
