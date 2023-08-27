import type { Parser } from '../types/index.js'

/**
 * 指定した文字列内のいずれにも一致しない1文字を読み取るパーサ
 * @param exclusion
 */
export const noCharOf =
	(exclusion: string): Parser<string> =>
		({ input, position = 0 }) => {
			if (position >= input.length) {
				return {
					type: 'Failure',
					reason: 'expecting a character',
					state: { input, position }
				}
			}

			const char = input[position]

			return exclusion.includes(char)
				? {
					type: 'Failure',
					reason: `expecting a character other than "${exclusion}"`,
					state: { input, position }
				}
				: {
					type: 'Success',
					value: char,
					state: { input, position: position + 1 }
				}
		}
