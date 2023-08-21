import { or } from './or.js'
import { string } from './string.js'
import { anyCharOf } from './anyCharOf.js'
import { seq } from './seq.js'

describe('or parser', () => {
	describe('or()', () => {
		const parser = or()

		it('入力が空のときは、パースに失敗する', () => {
			const input = ''
			const output = parser({ input })

			expect(output.type).toEqual('Failure')
		})

		it('入力が"a"のときは、パースに失敗する', () => {
			const input = 'a'
			const output = parser({ input })

			expect(output.type).toEqual('Failure')
		})
	})

	describe('or with anyCharOf', () => {
		const parser = or(
			anyCharOf('a'),
			anyCharOf('b'),
			anyCharOf('c'),
		)

		it('入力が空のときは、パースに失敗する', () => {
			const input = ''
			const output = parser({ input })

			expect(output.type).toEqual('Failure')
		})

		it('入力が"a"のときは、パースに成功し結果として"a"を取得できる', () => {
			const input = 'a'
			const output = parser({ input })

			if (output.type === 'Failure') {
				throw new Error('test failed')
			}

			expect(output.value).toEqual('a')
			expect(output.state.position).toEqual(1)
		})

		it('入力が"b"のときは、パースに成功し結果として"b"を取得できる', () => {
			const input = 'b'
			const output = parser({ input })

			if (output.type === 'Failure') {
				throw new Error('test failed')
			}

			expect(output.value).toEqual('b')
			expect(output.state.position).toEqual(1)
		})

		it('入力が"c"のときは、パースに成功し結果として"c"を取得できる', () => {
			const input = 'c'
			const output = parser({ input })

			if (output.type === 'Failure') {
				throw new Error('test failed')
			}

			expect(output.value).toEqual('c')
			expect(output.state.position).toEqual(1)
		})

		it('入力が"d"のときは、パースに失敗する', () => {
			const input = 'd'
			const output = parser({ input })

			expect(output.type).toEqual('Failure')
		})

		it('入力が"ab"のときは、パースに成功し結果として"a"を取得できる', () => {
			const input = 'ab'
			const output = parser({ input })

			if (output.type === 'Failure') {
				throw new Error('test failed')
			}

			expect(output.value).toEqual('a')
			expect(output.state.position).toEqual(1)
		})

		it('入力が"ab"でパースの開始位置が1のときは、パースに成功し結果として"b"を取得できる', () => {
			const input = 'ab'
			const output = parser({ input, position: 1 })

			if (output.type === 'Failure') {
				throw new Error('test failed')
			}

			expect(output.value).toEqual('b')
			expect(output.state.position).toEqual(2)
		})
	})

	describe('or with string', () => {
		const parser = or(
			string('apple'),
			string('banana'),
		)

		it('入力が空のときは、パースに失敗する', () => {
			const input = ''
			const output = parser({ input })

			expect(output.type).toEqual('Failure')
		})

		it('入力が"apple"のときは、パースに成功し結果として"apple"を取得できる', () => {
			const input = 'apple'
			const output = parser({ input })

			if (output.type === 'Failure') {
				throw new Error('test failed')
			}

			expect(output.value).toEqual('apple')
			expect(output.state.position).toEqual(5)
		})

		it('入力が"banana"のときは、パースに成功し結果として"banana"を取得できる', () => {
			const input = 'banana'
			const output = parser({ input })

			if (output.type === 'Failure') {
				throw new Error('test failed')
			}

			expect(output.value).toEqual('banana')
			expect(output.state.position).toEqual(6)
		})

		it('入力が"orange"のときは、パースに失敗する', () => {
			const input = 'orange'
			const output = parser({ input })

			expect(output.type).toEqual('Failure')
		})
	})

	describe('or and seq', () => {
		const parser =
			or(
				seq(
					string('banana '),
					string('apple')
				),
				string('orange')
			)

		it('入力が空のときは、パースに失敗する', () => {
			const input = ''
			const output = parser({ input })

			expect(output.type).toEqual('Failure')
		})

		it('入力が"banana apple"のときは、パースに成功し結果として"banana apple"を取得できる', () => {
			const input = 'banana apple'
			const output = parser({ input })

			if (output.type === 'Failure') {
				throw new Error('test failed')
			}

			expect(output.value).toEqual(['banana ', 'apple'])
			expect(output.state.position).toEqual(12)
		})

		it('入力が"orange"のときは、パースに成功し結果として"orange"を取得できる', () => {
			const input = 'orange'
			const output = parser({ input })

			if (output.type === 'Failure') {
				throw new Error('test failed')
			}

			expect(output.value).toEqual('orange')
			expect(output.state.position).toEqual(6)
		})

		it('入力が"banana "のときは、パースに失敗する', () => {
			const input = 'banana '
			const output = parser({ input })

			expect(output.type).toEqual('Failure')
		})
	})
})
