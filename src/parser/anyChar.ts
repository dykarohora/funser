import type { Parser } from '../types/index.js'

/**
 * 任意の1文字を読み取るパーサ
 * @param input
 * @param position
 */
export const anyChar: Parser<string> =
	({ input, position = 0 }) =>
		// 読み取る文字がない場合は失敗
		position >= input.length
			? {
				type: 'Failure',
				reason: 'expecting a character',
				state: { input, position }
			}
			: {
				type: 'Success',
				value: input[position],
				state: { input, position: position + 1 }
			}
