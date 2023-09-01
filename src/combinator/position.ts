import type { Combinator, Parser } from '../types/index.js'

type SetAction = (position: number) => number
type Param = number | SetAction


/**
 * 次のパース開始位置を変更するコンビネータ
 * numberを渡した場合はその数値が次のパース開始位置となる
 * functionを渡した場合はその関数の引数に現在のパース開始位置が渡され、その関数の返り値が次のパース開始位置となる
 * @param position
 */
export function position<T>(position: number): Combinator<T, T>
export function position<T>(s: (position: number) => number): Combinator<T, T>
export function position<T>(param: Param): Combinator<T, T> {
	return (parser: Parser<T>): Parser<T> =>
		({ input, position = 0 }) => {
			const result = parser({ input, position })
			if (result.type === 'Failure') {
				return result
			}

			return typeof param === 'number'
				? {
					...result,
					state: { input, position: param }
				}
				: {
					...result,
					state: { input, position: param(result.state.position) }
				}
		}
}
