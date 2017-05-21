import { expect } from 'chai'
import { curry } from './curry'

describe('Curry suite', () => {
  it('Should curry functions with arity 2', () => {
    const a = (x1: number, x2: number) => x1 * x2
    const aCurried = curry(a)

    expect(aCurried(1)(2)).to.equal(2)
    expect(aCurried(1, 2)).to.equal(2)
    expect(aCurried(3)(6)).to.equal(18)
  })

  it('Should curry functions with arity 3', () => {
    const b = (x1: number, x2: number, x3: number) => x1 * x2 * x3
    const bCurried = curry(b)

    expect(bCurried(1)(2)(3)).to.equal(6)
    expect(bCurried(1, 2)(3)).to.equal(6)
    expect(bCurried(1, 2, 3)).to.equal(6)
    expect(bCurried(1)(2, 3)).to.equal(6)
  })
})
