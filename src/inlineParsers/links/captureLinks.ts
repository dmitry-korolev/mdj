import { exec, matches } from 'utils'

import { Parsed, NodeLink, Tokenizer, NodeImage } from 'models'

const execAutolink = exec(/^<([^ >]+(@|:\/)[^ >]+)>/)
const captureAutolink = (source: string): Parsed<NodeLink> | null => {
  if (source[0] !== '<') {
    return null
  }

  const result = execAutolink(source)

  if (!result) {
    return null
  }

  const capture = result[0]
  const at = result[2]
  let text = result[1]
  let href = ''

  if (at === '@') {
    text = text.charAt(6) === ':' ? text.substring(7) : text
    href = 'mailto:' + text
  } else {
    href = text
  }

  return {
    token: {
      type: 'link',
      href,
      children: [
        {
          type: 'text',
          value: text
        }
      ]
    },
    newSource: source.substring(capture.length)
  }
}

const testUrlStart = matches(/^http/)
const execUrl = exec(/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/)
const captureUrl = (source: string): Parsed<NodeLink> | null => {
  if (!testUrlStart(source)) {
    return null
  }

  const result = execUrl(source)

  if (!result) {
    return null
  }

  const capture = result[0]
  const text = result[1]

  return {
    token: {
      type: 'link',
      href: text,
      children: [
        {
          type: 'text',
          value: text
        }
      ]
    },
    newSource: source.substring(capture.length)
  }
}

const execLink = exec(/^!?\[(.*)\]\((?:([\S]*) *["'](.*)["']\)|(.*)(?: *\)))/)
const fixLink = (input: string) => {
  let parenLevel = 0
  let result = ''
  for (let i = 0; i < input.length; i += 1) {
    if (input[i] === ')' && parenLevel === 0) break
    if (input[i] === '(') parenLevel++
    if (input[i] === ')') parenLevel--
    result = result + input[i]
  }

  return [result, input.substring(result.length)]
}

const captureLink = (source: string, inlineLexer: Tokenizer): Parsed<NodeLink | NodeImage> | null => {
  if (source[0] !== '[' && source[0] !== '!') {
    return null
  }

  const result = execLink(source)
  let token: NodeLink | NodeImage
  if (!result) {
    return null  }

  let capture = result[0];  const text = result[1];  let href = result[2];  const title = result[3]
  if (result[4]) {
    const fixedLink = fixLink(result[4])
    href = fixedLink[0]
    capture = fixedLink[1].length ? capture.slice(0, -fixedLink[1].length) : capture
  }

  if (capture[0] === '!') {
    token = {
      type: 'image',
      src: href,
      alt: text
    }
  } else {
    token = {
      type: 'link',
      href,
      children: inlineLexer(text)
    }
  }

  if (title) {
    token.title = title
  }

  return {
    token,
    newSource: source.substring(capture.length)
  }
}
const captureLinks = (source: string, inlineLexer: Tokenizer): Parsed<NodeLink | NodeImage> | null =>
  captureAutolink(source) || captureUrl(source) || captureLink(source, inlineLexer)

export { captureLinks }
