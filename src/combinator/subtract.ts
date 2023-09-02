import type { Parser } from '../types/index.js'
import { seqParser } from '../parser/index.js'
import { not } from './not.js'
import { pipe } from './pipe.js'
import { map } from './map.js'

export const subtract =
	<T, U>(exclude: Parser<U>) =>
		(parser: Parser<T>): Parser<T> =>
			pipe(
				seqParser(not(exclude), parser),
				map(([_, value]) => value)
			)
