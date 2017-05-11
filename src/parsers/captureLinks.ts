import { exec, matches } from 'utils'

import { Parsed, NodeLink, Tokenizer, NodeImage } from 'models'

const execAutolink = exec(/^<([^ >]+(@|:\/)[^ >]+)>/)
const captureAutolink = (source: string): Parsed<NodeLink> | null => {
  if (source[0] !== '<') {
    return null
  }

  const [capture = '', _text = '', at = ''] = execAutolink(source)
  let text = ''
  let href = ''

  if (!capture) {
    return null
  }

  if (at === '@') {
    text = _text.charAt(6) === ':' ? _text.substring(7) : _text
    href = 'mailto:' + text
  } else {
    text = _text
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

  const [capture = '', text = ''] = execUrl(source)

  if (!capture) {
    return null
  }

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

  const [capture = '', text = '', href = '', title = ''] = execLink(source)
  let token: NodeLink | NodeImage

  if (!capture) {
    return null
  }

  if (text[0] === '!') {
    token = {
      type: 'image',
      src: href,
      alt: text,
      title
    }
  } else {
    token = {
      type: 'link',
      href,
      title,
      children: inlineLexer(text)
    }
  }

  return {
    token,
    newSource: source.substring(capture.length)
  }

}

const captureLinks = (source: string, inlineLexer: Tokenizer): Parsed<NodeLink | NodeImage> | null =>
  captureAutolink(source) || captureUrl(source) || captureLink(source, inlineLexer)

export { captureLinks }
