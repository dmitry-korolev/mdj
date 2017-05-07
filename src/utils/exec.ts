import { curry } from 'utils'

const exec = curry((regExp: RegExp, input: string): string[] | never[] => regExp.exec(input) || [])

export { exec }

