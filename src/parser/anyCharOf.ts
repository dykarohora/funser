import type { Parser } from '../types/index.js'

type StringToChars<S extends string> = S extends `${infer T}${infer Rest}`
	? T | StringToChars<Rest>
	: never

/**
 * 指定した文字列のいずれか1文字を読み取るパーサ
 * @param options
 */
export const anyCharOf =
	<T extends string>(options: T): Parser<StringToChars<T>> =>
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
					value: char as StringToChars<T>,
					state: { input, position: position + 1 }
				}
				: {
					type: 'Failure',
					reason: `expecting one of "${options}"`,
					state: { input, position }
				}
		}
