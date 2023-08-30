import type { Parser } from '../types/index.js'

export const eof: Parser<void> =
	({ input, position = 0 }) =>
		position === input.length
			? {
				type: 'Success',
				value: undefined,
				state: { input, position }
			}
			: {
				type: 'Failure',
				reason: 'expecting end of input',
				state: { input, position }
			}
