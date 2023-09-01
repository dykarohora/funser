import type { Parser } from '../types/index.js'

type Option = {
	consumption?: boolean // 引数tillに渡したパーサが入力を消費するかどうか
	includeTillResult?: boolean // 引数tillに渡したパーサの実行結果も結果に含めるかどうか
}
type Output<T, U, O extends Option> = O['includeTillResult'] extends false ? T[] : [...T[], U]

/**
 * 指定したパーサによるパースが成功するまで、前段のパーサを繰り返し実行するコンビネータ
 * @param till
 * @param option
 */
export const repeatTill =
	<T, U, O extends Option>(till: Parser<U>, option?: O) =>
		(parser: Parser<T>): Parser<Output<T, U, O>> =>
			({ input, position = 0 }) => {
				const { consumption = true, includeTillResult = true } = option ?? {}

				const values: T[] = []

				let state = { input, position }
				for (; ;) {
					const tillOutput = till({ input, position: state.position })

					if (tillOutput.type === 'Success') {

						return {
							type: 'Success',
							value: (includeTillResult ? [...values, tillOutput.value] : values) as Output<T, U, O>,
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

