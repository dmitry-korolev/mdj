import {
  INodeSpace,
  INodeText,
  INodeStrong,
  INodeEm,
  INodeStrikethrough,
  INodeCode,
  INodeLineBreak,
  INodeLink,
  INodeImage,
  INodeHeading,
  INodeBlockquote,
  INodeParagraph,
  INodeCodeBlock,
  INodeHR,
  INodeTable,
  INodeListItem,
  INodeList,
  INodeItem,
  ITokenizer,
  IParsed
} from './src/models'

type InlineParser = (source: string, inlineLexer?: ITokenizer) => IParsed<INodeItem>
type BlockParser = (source: string, blockLexer?: ITokenizer, inlineLexer?: ITokenizer) => IParsed<INodeItem>

interface MDJ {
  parse: (source: string) => INodeItem[]
  useInlineParser: (parser: InlineParser, priority: number) => MDJ
  useBlockParser: (parser: BlockParser, priority: number) => MDJ
}

declare const mdj: () => MDJ
declare const parse: (source: string) => INodeItem[]

export default mdj
export {
  parse,
  INodeSpace,
  INodeText,
  INodeStrong,
  INodeEm,
  INodeStrikethrough,
  INodeCode,
  INodeLineBreak,
  INodeLink,
  INodeImage,
  INodeHeading,
  INodeBlockquote,
  INodeParagraph,
  INodeCodeBlock,
  INodeHR,
  INodeTable,
  INodeListItem,
  INodeList,
  INodeItem,
  ITokenizer,
  IParsed,
  MDJ
}