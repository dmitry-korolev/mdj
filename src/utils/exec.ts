import { curry } from 'utils'

const exec = curry((regExp: RegExp, input: string): string[] | null => regExp.exec(input))

export { exec }
