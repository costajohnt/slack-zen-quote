import Decoder, { succeed, at, string } from "jsonous";
import { ZenQuote } from "./Types";

export const quoteDecoder: Decoder<ZenQuote> = succeed({})
  .assign('quote', at([0, 'q'], string))
  .assign('author', at([0, 'a'], string));