import type { Parser, ParserOutput } from '../types/index.js'
import { seqParser } from '../parser/index.js'
import { pipe } from './pipe.js'
import { subtract } from './subtract.js'
import { validate } from './validate.js'

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
						subtract(enclosure)
					),
					enclosure
				),
				validate(
					({ value: [prefix, _, postfix] }) => Array.isArray(prefix) && Array.isArray(postfix)
						? prefix.join('') === postfix.join('')
							? true
							: { reason: `expecting prefix and postfix to be the same` }
						: prefix === postfix
							? true
							: { reason: `expecting prefix and postfix to be the same` }
				)
			)
