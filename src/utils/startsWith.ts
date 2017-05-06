import { curry } from 'utils'

const startsWith = curry((what: string, where: string) => where.indexOf(what) === 0)

export { startsWith }
