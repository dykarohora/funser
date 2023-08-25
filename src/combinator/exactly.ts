import type { Parser } from '../types/index.js'
import { pipe } from './pipe.js'
import { repeat } from './repeat.js'

// eslint-disable-next-line @typescript-eslint/ban-types
type FixedArray<T, N extends number, R extends unknown[] = []> =
	R['length'] extends N ? R : FixedArray<T, N, [T, ...R]>

/**
 * 指定したパーサを指定した回数だけ繰り返すパーサ
 * @param times
 */
export const exactly =
	<T, N extends number>(times: N) =>
		(parser: Parser<T>): Parser<FixedArray<T, N>> =>
			pipe(
				repeat({ min: times, max: times })(parser),
				(result) => result as Parser<FixedArray<T, N>>
			)
