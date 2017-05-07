export interface NodeSpace {
  type: 'space'
}

export interface NodeText {
  type: 'text',
  value: string,
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
  value: string
}

export interface NodeCodeBlock {
  type: 'codeblock'
  language: string
  value: string
}

export interface NodeHR {
  type: 'hr'
}

export interface NodeTable {
  type: 'table'
  header: string[]
  align: Array<string | null>
  cells: string[][]
}

export type NodeItem =
  NodeSpace
  | NodeText
  | NodeHeading
  | NodeBlockquote
  | NodeParagraph
  | NodeCodeBlock
  | NodeHR
  | NodeTable

export interface Parsed<T> {
  token: T
  newSource: string
  inner?: string
}

export type Parser = (source: string, isTop: boolean, isBlockquote: boolean) => Parsed<NodeItem> | null
