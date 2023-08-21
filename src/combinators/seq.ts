import type { Parser } from '../parser/types.js'

export function seq<ExpectValues extends unknown[]>(...parsers: { [K in keyof ExpectValues]: Parser<ExpectValues[K]> }) {
	return <SourceValue>(sourceParser: Parser<SourceValue>): Parser<[SourceValue, ...ExpectValues]> =>
		({ input, position = 0 }) => {
			const values = []

			let currentPos = position
			for (const parser of [sourceParser, ...parsers]) {
				const result = parser({ input, position: currentPos })

				if (result.type === 'Failure') {
					return result
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
}

