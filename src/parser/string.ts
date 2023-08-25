import type { Parser } from '../types/index.js'

/**
 * 指定した文字列を読み取るパーサ
 * @param str
 */
export const string =
	<T extends string>(str: T): Parser<T> =>
		({ input, position = 0 }) => {
			if (position + str.length > input.length) {
				return {
					type: 'Failure',
					reason: `expecting "${str}"`,
					state: { input, position }
				}
			}

			const substr = input.slice(position, position + str.length)

			return str === substr
				? {
					type: 'Success',
					value: str,
					state: { input, position: position + str.length }
				}
				: {
					type: 'Failure',
					reason: `expecting "${str}"`,
					state: { input, position }
				}
		}
