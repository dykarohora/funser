import type{ Parser } from '../types/index.js'
import { pipe } from './pipe.js'
import { seqParser } from '../parser/seqParser.js'
import { map } from './map.js'

/**
 * 前段のパーサと後段のパーサの両方が成功した時、後段の結果を返すコンビネータ
 * @param second
 */
export const lookBehind =
	<T, U>(second: Parser<T>) =>
		(first: Parser<U>): Parser<T> =>
			pipe(
				seqParser(first, second),
				map(([_, second]) => second)
			)
