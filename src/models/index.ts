export interface NodeSpace {
  type: 'space'
}

export interface NodeText {
  type: 'text',
  value: string
}

export interface NodeHeading {
  type: 'heading'
  level: number
  value: string
}

export interface NodeBlockquote {
  type: 'blockquote'
  children: NodeItem[]
}

export interface NodeParagraph {
  type: 'paragraph'
  children: NodeItem[]
}

export interface NodeCodeBlock {
  type: 'codeblock'
  language: string
  value: string
}

export interface NodeHR {
  type: 'hr'
}

export type NodeItem =
  NodeSpace
  | NodeText
  | NodeHeading
  | NodeBlockquote
  | NodeParagraph
  | NodeCodeBlock
  | NodeHR

export interface Parsed<T> {
  token: T,
  skip?: number
}
