import type { Combinator, Parser } from '../parser/types.js'
import { seq } from './seq.js'
import { or } from './or.js'

export const pipe = <T, P extends Array<Parser<unknown>>>(
	parser: Parser<T>,
	combinator: Combinator<P>
) => {
	switch (combinator.type) {
		case 'or':
			return or(parser, combinator)
		case 'seq':
			return seq(parser, combinator)
		default:
			throw new Error(combinator satisfies never)
	}
}
