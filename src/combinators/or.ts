import type { Combinator, OrCombinator, ParsedOrValue, Parser, ParserOutput } from '../parser/types.js'
import { string } from '../parser/string.js'
import { seq } from './seq.js'

export function or<T extends Array<Parser<unknown>>>(...parsers: [...T]): OrCombinator<T> {
	const f: Parser<ParsedOrValue<T>> = ({ input, position = 0 }) => {
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

	return Object.assign(f, { type: 'or' as const })
}
