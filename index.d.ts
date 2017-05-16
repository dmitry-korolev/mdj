import {
  NodeSpace,
  NodeText,
  NodeStrong,
  NodeEm,
  NodeStrikethrough,
  NodeCode,
  NodeLineBreak,
  NodeLink,
  NodeImage,
  NodeHeading,
  NodeBlockquote,
  NodeParagraph,
  NodeCodeBlock,
  NodeHR,
  NodeTable,
  NodeListItem,
  NodeList,
  NodeItem,
  Tokenizer,
  Parsed
} from './src/models'

type InlineParser = (source: string, inlineLexer?: Tokenizer) => Parsed<NodeItem>
type BlockParser = (source: string, blockLexer?: Tokenizer, inlineLexer?: Tokenizer) => Parsed<NodeItem>

interface MDJ {
  parse: (source: string) => NodeItem[]
  useInlineParser: (parser: InlineParser, priority: number) => MDJ
  useBlockParser: (parser: BlockParser, priority: number) => MDJ
}

declare const mdj: () => MDJ
declare const parse: (source: string) => NodeItem[]

export default mdj
export {
  parse,
  NodeSpace,
  NodeText,
  NodeStrong,
  NodeEm,
  NodeStrikethrough,
  NodeCode,
  NodeLineBreak,
  NodeLink,
  NodeImage,
  NodeHeading,
  NodeBlockquote,
  NodeParagraph,
  NodeCodeBlock,
  NodeHR,
  NodeTable,
  NodeListItem,
  NodeList,
  NodeItem,
  Tokenizer,
  Parsed,
  MDJ
}