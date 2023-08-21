import type { Combinator, Parser } from '../types.js'

export function pipe<T1>(sourceParser: Parser<T1>): Parser<T1>
export function pipe<T1, T2>(sourceParser: Parser<T1>, c1: Combinator<T1, T2>): Parser<T2>
export function pipe<T1, T2, T3>(sourceParser: Parser<T1>, c1: Combinator<T1, T2>, c2: Combinator<T2, T3>): Parser<T3>
export function pipe<T1, T2, T3, T4>(sourceParser: Parser<T1>, c1: Combinator<T1, T2>, c2: Combinator<T2, T3>, c3: Combinator<T3, T4>): Parser<T4>
export function pipe<T1, T2, T3, T4, T5>(sourceParser: Parser<T1>, c1: Combinator<T1, T2>, c2: Combinator<T2, T3>, c3: Combinator<T3, T4>, c4: Combinator<T4, T5>): Parser<T5>
export function pipe<T1, T2, T3, T4, T5, T6>(sourceParser: Parser<T1>, c1: Combinator<T1, T2>, c2: Combinator<T2, T3>, c3: Combinator<T3, T4>, c4: Combinator<T4, T5>, c5: Combinator<T5, T6>): Parser<T6>
export function pipe<T1, T2, T3, T4, T5, T6, T7>(sourceParser: Parser<T1>, c1: Combinator<T1, T2>, c2: Combinator<T2, T3>, c3: Combinator<T3, T4>, c4: Combinator<T4, T5>, c5: Combinator<T5, T6>, c6: Combinator<T6, T7>): Parser<T7>
export function pipe<T1, T2, T3, T4, T5, T6, T7, T8>(sourceParser: Parser<T1>, c1: Combinator<T1, T2>, c2: Combinator<T2, T3>, c3: Combinator<T3, T4>, c4: Combinator<T4, T5>, c5: Combinator<T5, T6>, c6: Combinator<T6, T7>, c7: Combinator<T7, T8>): Parser<T8>
export function pipe<T1, T2, T3, T4, T5, T6, T7, T8, T9>(sourceParser: Parser<T1>, c1: Combinator<T1, T2>, c2: Combinator<T2, T3>, c3: Combinator<T3, T4>, c4: Combinator<T4, T5>, c5: Combinator<T5, T6>, c6: Combinator<T6, T7>, c7: Combinator<T7, T8>, c8: Combinator<T8, T9>): Parser<T9>
export function pipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(sourceParser: Parser<T1>, c1: Combinator<T1, T2>, c2: Combinator<T2, T3>, c3: Combinator<T3, T4>, c4: Combinator<T4, T5>, c5: Combinator<T5, T6>, c6: Combinator<T6, T7>, c7: Combinator<T7, T8>, c8: Combinator<T8, T9>, c9: Combinator<T9, T10>): Parser<T10>
export function pipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11>(sourceParser: Parser<T1>, c1: Combinator<T1, T2>, c2: Combinator<T2, T3>, c3: Combinator<T3, T4>, c4: Combinator<T4, T5>, c5: Combinator<T5, T6>, c6: Combinator<T6, T7>, c7: Combinator<T7, T8>, c8: Combinator<T8, T9>, c9: Combinator<T9, T10>, c10: Combinator<T10, T11>): Parser<T11>
export function pipe(
	sourceParser: Parser<unknown>,
	...combinators: Array<Combinator<unknown, unknown>>
) {
	return combinators.reduce((acc, combinator) => combinator(acc), sourceParser)
}
