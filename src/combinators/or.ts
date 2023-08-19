import type { Parser } from '../parser/types.js'

export function or<T>(...parsers: Array<Parser<T>>): Parser<T> {
	return ({ input, position = 0 }) => {
		for (const parser of parsers) {
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
