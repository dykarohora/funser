import type { Parser } from '../types.js'

type Payload = {
	min?: number
	max?: number
}

/**
 * パーサを繰り返し評価するコンビネータ
 * 繰り返し回数の下限と上限を設定することができる
 * @param payload
 * @param payload
 */
export const repeat =
	<T>(payload?: Payload) =>
		(parser: Parser<T>): Parser<T[]> =>
			({ input, position = 0 }) => {
				const { min = 0, max = Number.POSITIVE_INFINITY } = payload ?? {}

				if (min > max || min < 0) {
					throw new Error('invalid payload')
				}

				const result: T[] = []
				const state = { input, position }

				for (let i = 0; i < max; i++) {
					const r = parser(state)

					if (r.type === 'Failure') {
						break
					}

					result.push(r.value)
					state.position = r.state.position
				}

				return result.length < min
					? {
						type: 'Failure',
						reason: `expecting repeat ${min} times`,
						state: { input, position }
					}
					: {
						type: 'Success',
						value: result,
						state
					}
			}
