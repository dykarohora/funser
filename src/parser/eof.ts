import type { Parser } from '../types/index.js'

export const eof = <T>(result?: T): Parser<T | undefined> =>
	({ input, position = 0 }) =>
		position === input.length
			? {
				type: 'Success',
				value: result,
				state: { input, position }
			}
			: {
				type: 'Failure',
				reason: 'expecting end of input',
				state: { input, position }
			}
