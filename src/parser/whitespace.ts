import { orParser } from './orParser.js'
import { newline } from './newline.js'
import { space } from './space.js'
import type { Parser } from '../types/index.js'

export const whitespace: Parser<'\r' | '\n' | '\r\n' | '\t' | ' '> =
	orParser(newline, space)
