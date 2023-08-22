import type { ParsedSeqValue, Parser } from '../types.js'

/**
 * 複数のパーサを順番に実行し、すべてのパースが成功したら結果をタプルで返すパーサ
 * @param parsers
 */
export const seq =
	<T extends Array<Parser<unknown>>>(...parsers: [...T]): Parser<ParsedSeqValue<T>> =>
		({ input, position = 0 }) => {
			const values = [] as ParsedSeqValue<T>

			let currentPos = position
			for (const parser of parsers) {
				const result = parser({ input, position: currentPos })

				if (result.type === 'Failure') {
					return { ...result, state: { input, position } }
				}

				values.push(result.value)
				currentPos = result.state.position
			}

			return {
				type: 'Success',
				value: values,
				state: { input, position: currentPos }
			}
		}
