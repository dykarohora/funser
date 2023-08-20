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
