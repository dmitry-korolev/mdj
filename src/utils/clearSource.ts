const clearSource = (input: string) => input.replace(/\r\n|\r/g, '\n')
  .replace(/\t/g, '    ')
  .replace(/\u00a0/g, ' ')
  .replace(/\u2424/g, '\n')
  .replace(/^ +$/gm, '')

export { clearSource }
