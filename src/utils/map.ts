import { curry } from 'utils'

type MapFunction = (value: any, index: number, array: any[]) => any

const map = curry((fn: Function, input: any[]) => input.map(fn as MapFunction))

export { map }
