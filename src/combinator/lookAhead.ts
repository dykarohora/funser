import type { Parser } from '../types.js'
import { pipe } from './pipe.js'
import { seq } from '../parser/seq.js'
import { map } from './map.js'

/**
 * 前段のパーサと後段のパーサの両方が成功したとき、前段の結果を返すコンビネータ
 */
export const lookAhead =
	<T, U>(second: Parser<T>) =>
		(first: Parser<U>): Parser<U> =>
			pipe(
				seq(first, second),
				map(([first, second]) => first)
			)
