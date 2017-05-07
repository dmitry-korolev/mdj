const trimRegExp = /(^ *\|* *)|( *\|$)/g
const trimOuterBounds = (input: string): string => input.replace(trimRegExp, '')

export { trimOuterBounds }
