import type { Parser } from '../parser/types.js'

type ParsedValue<P> = P extends Parser<infer T> ? T : never
type SequentialValue<T extends Array<Parser<unknown>>> = { [K in keyof T]: ParsedValue<T[K]> }

export function seq<T extends Array<Parser<unknown>>>(...parsers: [...T]): Parser<SequentialValue<T>> {
	return ({ input, position = 0 }) => {
		const values = [] as SequentialValue<T>

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
