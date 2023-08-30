import type { Parser } from '../types/index.js'
import { orParser } from './orParser.js'
import { anyCharOf } from './anyCharOf.js'

/**
 * 空白文字(スペースかタブ)を読み取るパーサ
 * @param input
 * @param position
 */
export const space: Parser<' ' | '\t'> = orParser(anyCharOf(' \t'))
