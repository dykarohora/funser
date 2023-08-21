import type { Parser } from '../parser/types.js'

export function or<ExpectValues extends unknown[]>(...parsers: { [K in keyof ExpectValues]: Parser<ExpectValues[K]> }) {
	return <SourceValue>(sourceParser: Parser<SourceValue>): Parser<SourceValue | ExpectValues[number]> =>
		({ input, position = 0 }) => {
			for (const parser of [sourceParser, ...parsers]) {
				const result = parser({ input, position })

				if (result.type === 'Success') {
					return result
				}
			}

			return {
				type: 'Failure',
				reason: 'all parsers failed',
				state: { input, position }
			}
		}
}
