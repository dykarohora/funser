import type { Parser } from '../types/index.js'
import { pipe } from './pipe.js'
import { seqParser } from '../parser/index.js'
import { map } from './map.js'

type Option = {
	consumption?: boolean
}

/**
 * 前段のパーサと後段のパーサの両方が成功したとき、前段の結果を返すコンビネータ
 */
export const lookAhead =
	<T, U>(second: Parser<T>, option: Option = { consumption: true }) =>
		(first: Parser<U>): Parser<U> =>
			({ input, position = 0 }) => {
				const { consumption = true } = option
				if (consumption) {
					return pipe(
						seqParser(first, second),
						map(([firstResult,]) => firstResult)
					)({ input, position })
				}

				const firstResult = first({ input, position })
				if (firstResult.type === 'Failure') {
					return firstResult
				}

				const secondResult = second({ input, position: firstResult.state.position })

				return secondResult.type === 'Success'
					? {
						...firstResult,
						state: { input, position: firstResult.state.position }
					}
					: {
						...secondResult,
						state: { input, position }
					}
			}
