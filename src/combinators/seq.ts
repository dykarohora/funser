import type { ParsedSeqValue, Parser, SeqCombinator } from '../parser/types.js'

export function seq<T extends Array<Parser<unknown>>>(...parsers: [...T]): SeqCombinator<T> {
	const parser: Parser<ParsedSeqValue<T>> = ({ input, position = 0 }) => {
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

	return Object.assign(parser, { type: 'seq' as const })
}
