import type { ParsedOrValue, Parser, ParserOutput } from '../types.js'

/**
 * 複数のパーサのうち、どれか1つでも成功したら成功とするパーサ
 * @param parsers
 */
export function or<T extends Array<Parser<unknown>>>(...parsers: [...T]): Parser<ParsedOrValue<T>> {
	return ({ input, position = 0 }) => {
		for (const parser of parsers) {
			const result = parser({ input, position })

			if (result.type === 'Success') {
				return result as ParserOutput<ParsedOrValue<T>>
			}
		}

		return {
			type: 'Failure',
			reason: 'all parsers failed',
			state: { input, position }
		}
	}
}

