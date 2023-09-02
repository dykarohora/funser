import type { Parser } from '../types/index.js'

export const not =
	(parser: Parser<unknown>): Parser<void> =>
		({ input, position = 0 }) =>
			parser({ input, position }).type === 'Failure'
				? {
					type: 'Success',
					value: undefined,
					state: { input, position }
				}
				: {
					type: 'Failure',
					reason: 'not',
					state: { input, position }
				}
