import type { ParsedSeqValue, Parser } from './types.js'

export function seq<T extends Array<Parser<unknown>>>(...parsers: [...T]): Parser<ParsedSeqValue<T>> {
	return ({ input, position = 0 }) => {
		const values = [] as ParsedSeqValue<T>

		let currentPos = position
		for (const parser of parsers) {
			const result = parser({ input, position: currentPos })

			if (result.type === 'Failure') {
				return result
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
}
