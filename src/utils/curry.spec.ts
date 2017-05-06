import { expect } from 'chai'
import { curry } from './curry'

describe('Curry suite', () => {
  it('Should curry functions with arity 2', () => {
    const a = (a: number, b: number) => a * b
    const aCurried = curry(a)

    expect(aCurried(1)(2)).to.equal(2)
    expect(aCurried(1, 2)).to.equal(2)
    expect(aCurried(3)(6)).to.equal(18)
  })

  it('Should curry functions with arity 3', () => {
    const b = (a: number, b: number, c: number) => a * b * c
    const bCurried = curry(b)

    expect(bCurried(1)(2)(3)).to.equal(6)
    expect(bCurried(1, 2)(3)).to.equal(6)
    expect(bCurried(1, 2, 3)).to.equal(6)
    expect(bCurried(1)(2, 3)).to.equal(6)
  })
})
