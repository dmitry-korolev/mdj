export interface INodeSpace {
  type: 'space'
}

export interface INodeText {
  type: 'text'
  value?: string
}

export interface INodeStrong {
  type: 'strong'
  children: INodeItem[]
}

export interface INodeEm {
  type: 'em'
  children: INodeItem[]
}

export interface INodeStrikethrough {
  type: 'strikethrough'
  children: INodeItem[]
}

export interface INodeCode {
  type: 'code'
  value: string
}

export interface INodeLineBreak {
  type: 'br'
}

export interface INodeLink {
  type: 'link'
  href: string
  title?: string
  children: INodeItem[]
}

export interface INodeImage {
  type: 'image'
  src: string
  alt: string
  title?: string
}

export interface INodeHeading {
  type: 'heading'
  level: number
  children: INodeItem[]
}

export interface INodeBlockquote {
  type: 'blockquote'
  children: INodeItem[]
}

export interface INodeParagraph {
  type: 'paragraph'
  children: INodeItem[]
}

export interface INodeCodeBlock {
  type: 'codeblock'
  language: string
  value?: string
}

export interface INodeHR {
  type: 'hr'
}

export interface INodeTable {
  type: 'table'
  header: INodeItem[][]
  align: Array<string | null>
  cells: INodeItem[][][] // rows -> cells -> INodeItem[]
}

export interface INodeListItem {
  type: 'listitem'
  children: INodeItem[]
}

export interface INodeList {
  type: 'list'
  ordered: boolean
  start: number | null
  children: INodeListItem[]
}

export interface INodeHTML {
  type: 'html'
  value: string
}

export type IBlockNodes =
  INodeBlockquote |
  INodeCodeBlock |
  INodeHeading |
  INodeHR |
  INodeHTML |
  INodeList |
  INodeListItem |
  INodeParagraph |
  INodeSpace |
  INodeTable

export type IInlineNodes =
  INodeCode |
  INodeEm |
  INodeImage |
  INodeHTML |
  INodeLineBreak |
  INodeLink |
  INodeStrikethrough |
  INodeStrong |
  INodeText

export type INodeItem = IBlockNodes | IInlineNodes

export interface IParsed<T> {
  token: T
  newSource: string
}

// TODO: type tokenizer
export type ITokenizer = (source: string) => INodeItem[]
export type IParser = (source: string, blockLexer?: ITokenizer, inlineLexer?: ITokenizer) => IParsed<INodeItem> | null

export interface IMDJOptions {
  html?: boolean
}
