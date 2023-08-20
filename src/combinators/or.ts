import type { Parser, ParserOutput } from '../parser/types.js'

type AlternativeValue<T extends Array<Parser<unknown>>> = T extends Array<Parser<infer U>> ? U : never

export function or<T extends Array<Parser<unknown>>>(...parsers: [...T]): Parser<AlternativeValue<T>> {
	return ({ input, position = 0 }) => {
		for (const parser of parsers) {
			const result = parser({ input, position })

			if (result.type === 'Success') {
				return result as ParserOutput<AlternativeValue<T>>
			}
		}

		return {
			type: 'Failure',
			reason: 'all parsers failed',
			state: { input, position }
		}
	}
}
