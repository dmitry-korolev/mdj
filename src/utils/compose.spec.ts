import { expect } from 'chai'
import { compose } from './compose'

describe('Compose', () => {
  it('Should compose functions', () => {
    expect(
      compose(
        (a) => a * 2,
        (a: number) => a + 10
      )(10)
    ).to.equal(40)

    expect(
      compose(
        (a) => a + 10,
        (a: number) => a * 2
      )(10)
    ).to.equal(30)

    expect(
      compose(
        (a) => a * 2,
        (a: number) => a * 2,
        (a: number) => a + 10
      )(10)
    ).to.equal(80)

    expect(
      compose(
        (a) => a + 10,
        (a: number) => a + 10,
        (a: number) => a * 2
      )(10)
    ).to.equal(40)
  })
})
