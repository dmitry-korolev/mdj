import { expect } from 'chai'
import { map } from './map'

describe('Map', () => {
  it('Should map input', () => {
    expect(
      map((a: number) => a * 2, [1, 2, 3])
    ).to.eql([2, 4, 6])

    expect(
      map((a: number) => a * 2)([1, 2, 3])
    ).to.eql([2, 4, 6])

    expect(
      map((a: number, index) => (a + index) * 2)([1, 2, 3])
    ).to.eql([2, 6, 10])
  })
})
