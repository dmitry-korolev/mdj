import {
  IMDJOptions,
  INodeItem,
  IParsed,
  ITokenizer
} from './src/models'

type IInlineParser = (source: string, inlineLexer?: ITokenizer) => IParsed<INodeItem>
type IBlockParser = (source: string, blockLexer?: ITokenizer, inlineLexer?: ITokenizer) => IParsed<INodeItem>

interface IMDJ {
  parse: (source: string) => INodeItem[]
  useIInlineParser: (parser: IInlineParser, priority: number) => IMDJ
  useIBlockParser: (parser: IBlockParser, priority: number) => IMDJ
}

declare const mdj: (options?: IMDJOptions) => IMDJ
declare const parse: (source: string) => INodeItem[]