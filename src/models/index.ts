export interface NodeSpace {
  type: 'space'
}

export interface NodeText {
  type: 'text',
  rawValue?: string
}

export interface NodeHeading {
  type: 'heading'
  level: number
  rawValue?: string
  children: NodeItem[]
}

export interface NodeBlockquote {
  type: 'blockquote'
  children: NodeItem[]
}

export interface NodeParagraph {
  type: 'paragraph'
  rawValue?: string
  children: NodeItem[]
}

export interface NodeCodeBlock {
  type: 'codeblock'
  language: string
  value?: string
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

export interface NodeListItem {
  type: 'listitem'
  children: NodeItem[]
}

export interface NodeList {
  type: 'list'
  ordered: boolean
  start: number | null
  children: NodeListItem[]
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
  | NodeList
  | NodeListItem

export interface Parsed<T> {
  token: T
  newSource: string
}

// TODO: type tokenizer
export type Tokenize = (source: string) => NodeItem[]
export type Parser = (source: string, tokenizer: Tokenize) => Parsed<NodeItem> | null
