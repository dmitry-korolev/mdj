import { curry } from 'utils'

const matches = curry((withWhat: RegExp, what: string) => withWhat.test(what))

export { matches }
