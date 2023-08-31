import { pipe } from './pipe.js'
import { string } from '../parser/string.js'
import { lookAhead } from './lookAhead.js'

describe('lookAhead', () => {
	describe('consumption', () => {
		const parser = pipe(
			string('hello'),
			lookAhead(string('world')),
		)

		it('入力が空のときは、パースに失敗する', () => {
			const input = ''
			const output = parser({ input })

			expect(output.type).toEqual('Failure')
		})

		it('入力が"helloworld"のとき、パースに成功し結果として"hello"が取得できる', () => {
			const input = 'helloworld'
			const output = parser({ input })

			if (output.type === 'Failure') {
				throw new Error('test failed')
			}

			expect(output.value).toEqual('hello')
			expect(output.state.position).toEqual(10)
		})

		it('入力が"helloworld"でパースの開始位置が1のとき、パースに成功し結果として"hello"が取得できる', () => {
			const input = 'ahelloworld'
			const output = parser({ input, position: 1 })

			if (output.type === 'Failure') {
				throw new Error('test failed')
			}

			expect(output.value).toEqual('hello')
			expect(output.state.position).toEqual(11)
		})

		it('入力が"hellohey"のとき、パースに失敗する', () => {
			const input = 'hellohey'
			const output = parser({ input })

			expect(output.type).toEqual('Failure')
			expect(output.state.position).toEqual(0)
		})
	})

	describe('no consumption', () => {
		const parser = pipe(
			string('hello'),
			lookAhead(string('world'), { consumption: false }),
		)

		it('入力が空のときは、パースに失敗する', () => {
			const input = ''
			const output = parser({ input })

			expect(output.type).toEqual('Failure')
		})

		it('入力が"ahelloworld"でパース開始位置が1のとき、パースに成功し結果として"hello"が取得でき、positionは5となる', () => {
			const input = 'ahelloworld'
			const output = parser({ input, position: 1 })

			if (output.type === 'Failure') {
				throw new Error('test failed')
			}

			expect(output.value).toEqual('hello')
			expect(output.state.position).toEqual(6)
		})

		it('入力が"helloworld"のとき、パースに成功し結果として"hello"が取得でき、positionは5となる', () => {
			const input = 'helloworld'
			const output = parser({ input })

			if (output.type === 'Failure') {
				throw new Error('test failed')
			}

			expect(output.value).toEqual('hello')
			expect(output.state.position).toEqual(5)
		})

		it('入力が"hellohey"のとき、パースに失敗する', () => {
			const input = 'hellohey'
			const output = parser({ input })

			expect(output.type).toEqual('Failure')
			expect(output.state.position).toEqual(0)
		})
	})
})
