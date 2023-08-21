import type { Parser } from '../types.js'

/**
 * パーサの結果を変換するコンビネータ
 * @param fn
 */
export const map =
	<T, U>(fn: (value: T) => U) =>
		(parser: Parser<T>): Parser<U> =>
			({ input, position = 0 }) => {
				const result = parser({ input, position })

				return result.type === 'Success'
					? {
						type: 'Success',
						value: fn(result.value),
						state: result.state
					}
					: result
			}
