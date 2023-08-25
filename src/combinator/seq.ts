import type { Parser } from '../types/index.js'

/**
 * パーサを直列に接続するコンビネータ
 * @param parsers
 */
export const seq = <ExpectValues extends unknown[]>(...parsers: { [K in keyof ExpectValues]: Parser<ExpectValues[K]> }) =>
	<SourceValue>(sourceParser: Parser<SourceValue>): Parser<[SourceValue, ...ExpectValues]> =>
		({ input, position = 0 }) => {
			const values = []

			let currentPos = position
			for (const parser of [sourceParser, ...parsers]) {
				const result = parser({ input, position: currentPos })

				if (result.type === 'Failure') {
					return { ...result, state: { input, position } }
				}

				values.push(result.value)
				currentPos = result.state.position
			}

			return {
				type: 'Success',
				value: values as [SourceValue, ...ExpectValues],
				state: { input, position: currentPos }
			}
		}

