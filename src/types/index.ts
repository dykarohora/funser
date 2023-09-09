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

export type ParsedSeqValue<T extends Array<Parser<unknown>>> = { [K in keyof T]: ParsedValue<T[K]> }

export type Combinator<T, U> = (parser: Parser<T>) => Parser<U>

export type Some<T> = {
	type: 'Some',
	value: T
}

export type None = {
	type: 'None'
}

export type Option<T> = Some<T> | None
