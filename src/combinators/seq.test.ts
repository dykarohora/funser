import { seq } from './seq.js'
import { anyCharOf } from '../parser/anyCharOf.js'
import { or } from './or.js'
import { string } from '../parser/string.js'

describe('seq', () => {
	describe('seq()', () => {
		const parser = seq()

		it('入力が空のときは、パースに成功し結果として[]を取得できる', () => {
			const input = ''
			const output = parser({ input })

			if (output.type === 'Failure') {
				throw new Error('test failed')
			}

			expect(output.value).toEqual([])
		})

		it('入力が"a"のときは、パースに成功し結果として[]を取得できる', () => {
			const input = 'a'
			const output = parser({ input })

			if (output.type === 'Failure') {
				throw new Error('test failed')
			}

			expect(output.value).toEqual([])
			expect(output.state.position).toEqual(0)
		})
	})

	describe('seq(...parser)', () => {
		const parser = seq(
			anyCharOf('a'),
			anyCharOf('b'),
		)

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

		it('入力が"b"のときは、パースに失敗する', () => {
			const input = 'b'
			const output = parser({ input })

			expect(output.type).toEqual('Failure')
		})

		it('入力が"ab"のときは、パースに成功し結果として["a", "b"]を取得できる', () => {
			const input = 'ab'
			const output = parser({ input })

			if (output.type === 'Failure') {
				throw new Error('test failed')
			}

			expect(output.value).toEqual(['a', 'b'])
			expect(output.state.position).toEqual(2)
		})

		it('入力が"abc"のときは、パースに成功し結果として["a", "b"]を取得できる', () => {
			const input = 'abc'
			const output = parser({ input })

			if (output.type === 'Failure') {
				throw new Error('test failed')
			}

			expect(output.value).toEqual(['a', 'b'])
			expect(output.state.position).toEqual(2)
		})

		it('入力が"ba"のときは、パースに失敗する', () => {
			const input = 'ba'
			const output = parser({ input })

			expect(output.type).toEqual('Failure')
		})

		it('入力が"cab"のときは、パースに失敗する', () => {
			const input = 'cab'
			const output = parser({ input })

			expect(output.type).toEqual('Failure')
		})

		it('入力が"cab"でパースの開始位置が1のときは、パースに成功し結果として["a", "b"]を取得できる', () => {
			const input = 'cab'
			const output = parser({ input, position: 1 })

			if (output.type === 'Failure') {
				throw new Error('test failed')
			}

			expect(output.value).toEqual(['a', 'b'])
			expect(output.state.position).toEqual(3)
		})
	})

	describe('seq and or', () => {
		const parser =
			seq(
				or(
					string('hello '),
					string('hi ')
				),
				string('world')
			)

		it('入力が空のときは、パースに失敗する', () => {
			const input = ''
			const output = parser({ input })

			expect(output.type).toEqual('Failure')
		})

		it('入力が"hello world"のときは、パースに成功し結果として["hello ", "world"]を取得できる', () => {
			const input = 'hello world'
			const output = parser({ input })

			if (output.type === 'Failure') {
				throw new Error('test failed')
			}

			expect(output.value).toEqual(['hello ', 'world'])
			expect(output.state.position).toEqual(11)
		})

		it('入力が"hi world"のときは、パースに成功し結果として["hi ", "world"]を取得できる', () => {
			const input = 'hi world'
			const output = parser({ input })

			if (output.type === 'Failure') {
				throw new Error('test failed')
			}

			expect(output.value).toEqual(['hi ', 'world'])
			expect(output.state.position).toEqual(8)
		})

		it('入力が"hello "のときは、パースに失敗する', () => {
			const input = 'hello '
			const output = parser({ input })

			expect(output.type).toEqual('Failure')
		})

		it('入力が"hi "のときは、パースに失敗する', () => {
			const input = 'hi '
			const output = parser({ input })

			expect(output.type).toEqual('Failure')
		})

		it('入力が"world"のときは、パースに失敗する', () => {
			const input = 'world'
			const output = parser({ input })

			expect(output.type).toEqual('Failure')
		})
	})
})
