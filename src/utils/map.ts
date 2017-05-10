import { curry } from 'utils'

type MapFunction = (value: any, index: number, array: any[]) => any

const map = curry((fn: MapFunction, input: any[]) => input.map(fn))

export { map }
