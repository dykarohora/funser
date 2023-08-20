export type Success<T> = {
	type: 'Success'
	value: T
}

export type Failure = {
	type: 'Failure'
	reason: string
}

export type Result<T> = Success<T> | Failure

export type ParseState = {
	readonly input: string
	position: number
}

export type ParserInput = {
	input: string
	position?: number
}

export type ParserOutput<T> =
	& { state: ParseState }
	& Result<T>

export type Parser<T> = (input: ParserInput) => ParserOutput<T>

export type ParsedValue<P> = P extends Parser<infer T> ? T : never

export type ParsedOrValue<T extends Array<Parser<unknown>>> = T extends Array<Parser<infer U>> ? U : never
export type OrCombinator<T extends Array<Parser<unknown>>> =
	& Parser<ParsedOrValue<T>>
	& { type: 'or' }

export type ParsedSeqValue<T extends Array<Parser<unknown>>> = { [K in keyof T]: ParsedValue<T[K]> }
export type SeqCombinator<T extends Array<Parser<unknown>>> =
	& Parser<ParsedSeqValue<T>>
	& { type: 'seq' }

export type Combinator<T extends Array<Parser<unknown>>> = OrCombinator<T> | SeqCombinator<T>
