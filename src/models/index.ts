export interface NodeSpace {
  type: 'space'
}

export interface NodeText {
  type: 'text'
  value?: string
}

export interface NodeStrong {
  type: 'strong'
  children: NodeItem[]
}

export interface NodeEm {
  type: 'em'
  children: NodeItem[]
}

export interface NodeStrikethrough {
  type: 'strikethrough'
  children: NodeItem[]
}

export interface NodeCode {
  type: 'code'
  value: string
}

export interface NodeLineBreak {
  type: 'br'
}

export interface NodeLink {
  type: 'link'
  href: string
  title?: string
  children: NodeItem[]
}

export interface NodeImage {
  type: 'image'
  src: string
  alt: string
  title: string
}

export interface NodeHeading {
  type: 'heading'
  level: number
  children: NodeItem[]
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
  value?: string
}

export interface NodeHR {
  type: 'hr'
}

export interface NodeTable {
  type: 'table'
  header: string[]
  align: Array<string | null>
  cells: NodeItem[][][] // rows -> cells -> NodeItem[]
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
  | NodeLink
  | NodeImage
  | NodeStrong
  | NodeEm
  | NodeStrikethrough
  | NodeCode
  | NodeLineBreak

export interface Parsed<T> {
  token: T
  newSource: string
}

// TODO: type tokenizer
export type Tokenizer = (source: string) => NodeItem[]
export type Parser = (source: string, blockLexer?: Tokenizer, inlineLexer?: Tokenizer) => Parsed<NodeItem> | null
