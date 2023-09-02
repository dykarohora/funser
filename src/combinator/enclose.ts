import type { Parser } from '../types/index.js'
import { seqParser } from '../parser/index.js'
import { pipe } from './pipe.js'
import { subtract } from './subtract.js'

/**
 * 特定の文字で囲われていることを表すパーサーを返す
 * @param enclosure
 */
export const enclose =
	<T, U>(enclosure: Parser<U>) =>
		(parser: Parser<T>): Parser<[U, T, U]> =>
			pipe(
				seqParser(
					enclosure,
					pipe(
						parser,
						subtract(enclosure),
					),
					enclosure,
				)
			)
