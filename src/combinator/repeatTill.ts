import type { Parser } from '../types/index.js'

// TODO オプションどうする？
// tillの結果を含めるかどうか
// 入力を消費するかどうか

/**
 * 指定したパーサによるパースが成功するまで、前段のパーサを繰り返し実行するコンビネータ
 * @param till
 */
export const repeatTill =
	<T, U>(till: Parser<U>) =>
		(parser: Parser<T>): Parser<[...T[], U]> =>
			({ input, position = 0 }) => {
				const values: T[] = []

				for (let currentPos = position; ;) {
					const tillOutput = till({ input, position: currentPos })

					if (tillOutput.type === 'Success') {
						return {
							type: 'Success',
							value: [...values, tillOutput.value],
							state: tillOutput.state
						}
					}

					const parserOutput = parser({ input, position: currentPos })

					if (parserOutput.type === 'Failure') {
						return {
							type: 'Failure',
							reason: parserOutput.reason,
							state: { input, position }
						}
					}

					values.push(parserOutput.value)
					currentPos = parserOutput.state.position
				}
			}
