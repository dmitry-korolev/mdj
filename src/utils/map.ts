import { curry } from 'utils'

interface IMap {
  <V, R>(fn: (x0: V, x1: number, x2: V[]) => R): (input: V[]) => R[]
  <V, R>(fn: (x0: V, x1: number, x2: V[]) => R, input: V[]): R[]
}

const map: IMap = curry(<V, R>(fn: (x0: V, x1: number, x2: V[]) => R , input: V[]) => {
  const result = new Array(input.length)

  for (let i = 0; i < input.length; i += 1) {
    result[i] = fn(input[i], i, input)
  }

  return result
})

export { map }
