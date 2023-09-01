import { pipe } from './pipe.js'
import { anyChar, anyCharOf } from '../parser/index.js'
import { repeatTill } from './repeatTill.js'
import { position } from './position.js'

describe('position', () => {
	describe('引数に関数を渡した場合は、前段のパーサの結果による次の読み取り位置を関数に適用して次の読み取り位置を決定する', () => {
		const parser = pipe(
			anyChar,
			repeatTill(anyCharOf('!')),
			position(n => n - 1)
		)

		it('入力が"hello"の場合は、パースに失敗する', () => {
			const input = 'hello'
			const output = parser({ input })

			expect(output.type).toEqual('Failure')
			expect(output.state.position).toEqual(0)
		})

		it('入力が"hello!"の場合は、パースに成功し次の読み取り位置は5となる', () => {
			const input = 'hello!'
			const output = parser({ input })

			if (output.type === 'Failure') {
				throw new Error('test failed')
			}

			expect(output.value).toEqual(['h', 'e', 'l', 'l', 'o', '!'])
			expect(output.state.position).toEqual(5)
		})
	})

	describe('引数に数値を渡した場合は、その数値を次の読み取り位置とする', () => {
		const parser = pipe(
			anyChar,
			repeatTill(anyCharOf('!')),
			position(2)
		)

		it('入力が"hello"の場合は、パースに失敗する', () => {
			const input = 'hello'
			const output = parser({ input })

			expect(output.type).toEqual('Failure')
			expect(output.state.position).toEqual(0)
		})

		it('入力が"hello!"の場合は、パースに成功し次の読み取り位置は2となる', () => {
			const input = 'hello!'
			const output = parser({ input })

			if (output.type === 'Failure') {
				throw new Error('test failed')
			}

			expect(output.value).toEqual(['h', 'e', 'l', 'l', 'o', '!'])
			expect(output.state.position).toEqual(2)
		})
	})
})
