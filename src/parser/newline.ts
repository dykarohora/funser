import { orParser } from './orParser.js'
import { string } from './string.js'
import type { Parser } from '../types/index.js'

export const newline: Parser<'\r' | '\n' | '\r\n'> =
	orParser(
		string('\r\n'),
		string('\n'),
		string('\r'),
	)
