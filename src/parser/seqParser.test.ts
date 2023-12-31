import { seqParser } from './seqParser.js'
import { anyCharOf } from './anyCharOf.js'
import { orParser } from './orParser.js'
import { string } from './string.js'

describe('seq test', () => {
	describe('seq()', () => {
		const parser = seqParser()

		it('入力が空のときは、パースに成功し結果として[]を取得できる', () => {
			const input = ''
			const output = parser({ input })

			if (output.type === 'Failure') {
				throw new Error('test failed')
			}

			expect(output.value).toEqual([])
			expect(output.state.position).toEqual(0)
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
		const parser = seqParser(
			anyCharOf('a'),
			anyCharOf('b'),
		)

		it('入力が空のときは、パースに失敗する', () => {
			const input = ''
			const output = parser({ input })

			expect(output.type).toEqual('Failure')
			expect(output.state.position).toEqual(0)
		})

		it('入力が"a"のときは、パースに失敗する', () => {
			const input = 'a'
			const output = parser({ input })

			expect(output.type).toEqual('Failure')
			expect(output.state.position).toEqual(0)
		})

		it('入力が"b"のときは、パースに失敗する', () => {
			const input = 'b'
			const output = parser({ input })

			expect(output.type).toEqual('Failure')
			expect(output.state.position).toEqual(0)
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
			expect(output.state.position).toEqual(0)
		})

		it('入力が"cab"のときは、パースに失敗する', () => {
			const input = 'cab'
			const output = parser({ input })

			expect(output.type).toEqual('Failure')
			expect(output.state.position).toEqual(0)
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

		it('入力が"cacb"でパースの開始位置が1のときは、パースに失敗する', () => {
			const input = 'cacb'
			const output = parser({ input, position: 1 })

			expect(output.type).toEqual('Failure')
			expect(output.state.position).toEqual(1)
		})
	})

	describe('seq and or', () => {
		const parser =
			seqParser(
				orParser(
					string('hello '),
					string('hi ')
				),
				string('world')
			)

		it('入力が空のときは、パースに失敗する', () => {
			const input = ''
			const output = parser({ input })

			expect(output.type).toEqual('Failure')
			expect(output.state.position).toEqual(0)
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
			expect(output.state.position).toEqual(0)
		})

		it('入力が"hi "のときは、パースに失敗する', () => {
			const input = 'hi '
			const output = parser({ input })

			expect(output.type).toEqual('Failure')
			expect(output.state.position).toEqual(0)
		})

		it('入力が"world"のときは、パースに失敗する', () => {
			const input = 'world'
			const output = parser({ input })

			expect(output.type).toEqual('Failure')
			expect(output.state.position).toEqual(0)
		})

		it('入力が"ahello wor"でパースの開始位置が1のときは、パースに失敗する', () => {
			const input = 'ahello wor'
			const output = parser({ input, position: 1 })

			expect(output.type).toEqual('Failure')
			expect(output.state.position).toEqual(1)
		})
	})
})
