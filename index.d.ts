import { NodeItem, Tokenizer, Parsed } from './src/models'

type InlineParser = (source: string, inlineLexer?: Tokenizer) => Parsed<NodeItem>
type BlockParser = (source: string, blockLexer?: Tokenizer, inlineLexer?: Tokenizer) => Parsed<NodeItem>

interface MDS {
  parse: (source: string) => NodeItem[]
  useInlineParser: (parser: InlineParser, priority: number) => MDS
  useBlockParser: (parser: BlockParser, priority: number) => MDS
}

declare const mds: () => MDS
declare const parse: (source: string) => NodeItem[]

export default mds
export { parse }