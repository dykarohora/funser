import type { Option, Parser } from '../types/index.js'

export const option =
	<T>(parser: Parser<T>): Parser<Option<T>> =>
		({ input, position = 0 }) => {
			const result = parser({ input, position })

			return result.type === 'Success'
				? {
					type: 'Success',
					value: { type: 'Some', value: result.value },
					state: result.state
				}
				: {
					type: 'Success',
					value: { type: 'None' },
					state: { input, position }
				}
		}
