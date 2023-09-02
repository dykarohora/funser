import type { Parser, ParseState, Success } from '../types/index.js'

type Predicate<T> = (success: Success<T> & { state: ParseState }) => true | { reason: string }

/**
 * パーサの成功結果に対して追加検証を行うコンビネータ
 * @param predicate
 */
export const validate = <T>(predicate: Predicate<T>) =>
	(parser: Parser<T>): Parser<T> =>
		({ input, position = 0 }) => {
			const result = parser({ input, position })

			if (result.type === 'Failure') {
				return result
			}

			const validation = predicate(result)

			return validation === true
				? result
				: {
					type: 'Failure',
					reason: validation.reason,
					state: { input, position }
				}
		}
