import type { Parser, ParserOutput } from '../types/index.js'

/**
 * 特定の文字で囲われていることを表すパーサーを返す
 * @param enclosure
 */
export const enclose =
	<T, U>(enclosure: Parser<U>) =>
		(parser: Parser<T>): Parser<[U, T, U]> =>
			({ input, position = 0 }) => {
				const preOutput = enclosure({ input, position })

				if (preOutput.type === 'Failure') {
					return preOutput
				}

				const innerOutput = parser({ input, position: preOutput.state.position })

				if (innerOutput.type === 'Failure') {
					return {
						...innerOutput,
						state: { input, position }
					}
				}

				const postOutput = enclosure({ input, position: innerOutput.state.position })

				if (postOutput.type === 'Failure' || postOutput.value !== preOutput.value) {
					return {
						type: 'Failure',
						reason: 'Not bracketed by the same character.',
						state: { input, position }
					}
				}

				return {
					type: 'Success',
					value: [preOutput.value, innerOutput.value, postOutput.value],
					state: postOutput.state
				} satisfies ParserOutput<[U, T, U]>
			}
