import type { Parser } from '../types/index.js'

// TODO オプションどうする？
// tillの結果を含めるかどうか
// tillに入力を消費するかどうか

type Option = {
	consumption?: boolean // 引数tillに渡したパーサが入力を消費するかどうか
}

/**
 * 指定したパーサによるパースが成功するまで、前段のパーサを繰り返し実行するコンビネータ
 * @param till
 * @param option
 */
export const repeatTill =
	<T, U>(till: Parser<U>, option: Option = { consumption: true }) =>
		(parser: Parser<T>): Parser<[...T[], U]> =>
			({ input, position = 0 }) => {
				const { consumption = true } = option
				const values: T[] = []

				let state = { input, position }
				for (; ;) {
					const tillOutput = till({ input, position: state.position })

					if (tillOutput.type === 'Success') {
						return {
							type: 'Success',
							value: [...values, tillOutput.value],
							state: consumption ? tillOutput.state : state
						}
					}

					const parserOutput = parser({ input, position: state.position })

					if (parserOutput.type === 'Failure') {
						return {
							type: 'Failure',
							reason: parserOutput.reason,
							state: { input, position }
						}
					}

					values.push(parserOutput.value)
					state = parserOutput.state
				}
			}
