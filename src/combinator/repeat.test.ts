import { pipe } from './pipe.js'
import { string } from '../parser/string.js'
import { repeat } from './repeat.js'

describe('repeat', () => {
	describe('下限が設定されている', () => {
		const parser = pipe(
			string('hi'),
			repeat({ min: 2 })
		)

		it('入力が空のときは、パースに失敗する', () => {
			const input = ''
			const output = parser({ input })

			expect(output.type).toEqual('Failure')
		})

		it('入力がhiのときは、パースに失敗する', () => {
			const input = 'hi'
			const output = parser({ input })

			expect(output.type).toEqual('Failure')
		})

		it('入力がhihiのときは、パースに成功し結果として["hi", "hi"]を取得できる', () => {
			const input = 'hihi'
			const output = parser({ input })

			if (output.type === 'Failure') {
				throw new Error('test failed')
			}

			expect(output.value).toEqual(['hi', 'hi'])
			expect(output.state.position).toEqual(4)
		})

		it('入力がhihihiのときは、パースに成功し結果として["hi", "hi", "hi"]を取得できる', () => {
			const input = 'hihihi'
			const output = parser({ input })

			if (output.type === 'Failure') {
				throw new Error('test failed')
			}

			expect(output.value).toEqual(['hi', 'hi', 'hi'])
			expect(output.state.position).toEqual(6)
		})
	})

	describe('上限が設定されている', () => {
		const parser = pipe(
			string('hi'),
			repeat({ max: 2 })
		)

		it('入力が空のときは、パースに成功し結果として[]を取得できる', () => {
			const input = ''
			const output = parser({ input })

			if (output.type === 'Failure') {
				throw new Error('test failed')
			}

			expect(output.value).toEqual([])
			expect(output.state.position).toEqual(0)
		})

		it('入力がhiのときは、パースに成功し結果として["hi"]を取得できる', () => {
			const input = 'hi'
			const output = parser({ input })

			if (output.type === 'Failure') {
				throw new Error('test failed')
			}

			expect(output.value).toEqual(['hi'])
			expect(output.state.position).toEqual(2)
		})

		it('入力がhihiのときは、パースに成功し結果として["hi", "hi"]を取得できる', () => {
			const input = 'hihi'
			const output = parser({ input })

			if (output.type === 'Failure') {
				throw new Error('test failed')
			}

			expect(output.value).toEqual(['hi', 'hi'])
			expect(output.state.position).toEqual(4)
		})

		it('入力がhihihiのときは、パースに成功し結果として["hi", "hi"]を取得できる', () => {
			const input = 'hihihi'
			const output = parser({ input })

			if (output.type === 'Failure') {
				throw new Error('test failed')
			}

			expect(output.value).toEqual(['hi', 'hi'])
			expect(output.state.position).toEqual(4)
		})
	})

	describe('下限と上限が設定されている', () => {
		const parser = pipe(
			string('hi'),
			repeat({ min: 1, max: 1 })
		)

		it('入力が空のときは、パースに失敗する', () => {
			const input = ''
			const output = parser({ input })

			expect(output.type).toEqual('Failure')
		})

		it('入力がhiのときは、パースに成功し結果として["hi"]を取得できる', () => {
			const input = 'hi'
			const output = parser({ input })

			if (output.type === 'Failure') {
				throw new Error('test failed')
			}

			expect(output.value).toEqual(['hi'])
			expect(output.state.position).toEqual(2)
		})

		it('入力がhihiのときは、パースに成功し結果として["hi"]を取得できる', () => {
			const input = 'hihi'
			const output = parser({ input })

			if (output.type === 'Failure') {
				throw new Error('test failed')
			}

			expect(output.value).toEqual(['hi'])
			expect(output.state.position).toEqual(2)
		})
	})

	describe('下限と上限が設定されていない', () => {
		const parser = pipe(
			string('hi'),
			repeat()
		)

		it('入力が空のときは、パースに成功し結果として[]を取得できる', () => {
			const input = ''
			const output = parser({ input })

			if (output.type === 'Failure') {
				throw new Error('test failed')
			}

			expect(output.value).toEqual([])
			expect(output.state.position).toEqual(0)
		})

		it('入力がheyのとき、パースに成功し結果として[]を取得できる', () => {
			const input = 'hey'
			const output = parser({ input })

			if (output.type === 'Failure') {
				throw new Error('test failed')
			}

			expect(output.value).toEqual([])
			expect(output.state.position).toEqual(0)
		})

		it('入力がhiのときは、パースに成功し結果として["hi"]を取得できる', () => {
			const input = 'hi'
			const output = parser({ input })

			if (output.type === 'Failure') {
				throw new Error('test failed')
			}

			expect(output.value).toEqual(['hi'])
			expect(output.state.position).toEqual(2)
		})

		it('入力がhihiのときは、パースに成功し結果として["hi", "hi"]を取得できる', () => {
			const input = 'hihi'
			const output = parser({ input })

			if (output.type === 'Failure') {
				throw new Error('test failed')
			}

			expect(output.value).toEqual(['hi', 'hi'])
			expect(output.state.position).toEqual(4)
		})

		it('入力がhibhiのときは、パースに成功し結果として["hi"]を取得できる', () => {
			const input = 'hibhi'
			const output = parser({ input })

			if (output.type === 'Failure') {
				throw new Error('test failed')
			}

			expect(output.value).toEqual(['hi'])
			expect(output.state.position).toEqual(2)
		})
	})

	describe('異常系', () => {
		it('minが0より小さいときは例外がスローされる', () => {
			expect(() => {
				pipe(
					string('hi'),
					repeat({ min: -1 })
				)({ input: 'hi' })
			}).toThrow()
		})

		it('maxがminより小さいときは例外がスローされる', () => {
			expect(() => {
				pipe(
					string('hi'),
					repeat({ min: 2, max: 1 })
				)({ input: 'hi' })
			}).toThrow()
		})
	})
})
