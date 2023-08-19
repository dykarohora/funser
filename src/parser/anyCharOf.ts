import type { Parser } from './types.js'

/**
 * 指定した文字列のいずれか1文字を読み取るパーサ
 * @param options
 */
export const anyCharOf =
	(options: string): Parser<string> =>
		({ input, position = 0 }) => {
			if (position >= input.length) {
				return {
					type: 'Failure',
					reason: 'expecting a character',
					state: { input, position }
				}
			}

			const char = input[position]

			return options.includes(char)
				? {
					type: 'Success',
					value: char,
					state: { input, position: position + 1 }
				}
				: {
					type: 'Failure',
					reason: `expecting one of "${options}"`,
					state: { input, position }
				}
		}
