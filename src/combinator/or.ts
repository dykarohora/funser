import type { Parser } from '../types.js'

/**
 * 複数のパーサを順番に評価したとき最初に成功した結果を返すパーサを作るコンビネータ
 * @param parsers
 */
export const or = <ExpectValues extends unknown[]>(...parsers: { [K in keyof ExpectValues]: Parser<ExpectValues[K]> }) =>
	<SourceValue>(sourceParser: Parser<SourceValue>): Parser<SourceValue | ExpectValues[number]> =>
		({ input, position = 0 }) => {
			for (const parser of [sourceParser, ...parsers]) {
				const result = parser({ input, position })

				if (result.type === 'Success') {
					return result
				}
			}

			return {
				type: 'Failure',
				reason: 'all parsers failed',
				state: { input, position }
			}
		}
