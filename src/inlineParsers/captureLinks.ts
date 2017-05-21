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

const execLink = exec(/^!?\[((?:\[[^\]]*\]|[^[\]]|\](?=[^[]*\]))*)\]\(\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*\)/)
const captureLink = (source: string, inlineLexer: Tokenizer): Parsed<NodeLink | NodeImage> | null => {
  if (source[0] !== '[' && source[0] !== '!') {
    return null
  }

  const result = execLink(source)
  let token: NodeLink | NodeImage

  if (!result) {
    return null
  }

  const capture = result[0]
  const text = result[1]
  const href = result[2]
  const title = result[3]

  if (text[0] === '!') {
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
