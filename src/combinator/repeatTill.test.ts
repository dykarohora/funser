import { pipe } from './pipe.js'
import { anyChar, anyCharOf } from '../parser/index.js'
import { repeatTill } from './repeatTill.js'

describe('repeatTill', () => {
	describe('オプションなし', () => {
		const parser = pipe(
			anyChar,
			repeatTill(anyCharOf('!'))
		)

		it('入力が空文字の場合は、パースに失敗する', () => {
			const input = ''
			const output = parser({ input })

			expect(output.type).toEqual('Failure')
			expect(output.state.position).toEqual(0)
		})

		it('入力が"!"の場合は、パースに成功し結果として["!"]を取得できる', () => {
			const input = '!'
			const output = parser({ input })

			if (output.type === 'Failure') {
				throw new Error('test failed')
			}

			expect(output.value).toEqual(['!'])
			expect(output.state.position).toEqual(1)
		})

		it('入力が"abc"の場合は、パースに失敗する', () => {
			const input = 'abc'
			const output = parser({ input })

			expect(output.type).toEqual('Failure')
			expect(output.state.position).toEqual(0)
		})

		it('入力が"abc!"の場合は、パースに成功し結果として["a", "b", "c", "!"]を取得できる', () => {
			const input = 'abc!'
			const output = parser({ input })

			if (output.type === 'Failure') {
				throw new Error('test failed')
			}

			expect(output.value).toEqual(['a', 'b', 'c', '!'])
			expect(output.state.position).toEqual(4)
		})

		it('入力が"abc!def"の場合は、パースに成功し結果として["a", "b", "c", "!"]を取得できる', () => {
			const input = 'abc!def'
			const output = parser({ input })

			if (output.type === 'Failure') {
				throw new Error('test failed')
			}

			expect(output.value).toEqual(['a', 'b', 'c', '!'])
			expect(output.state.position).toEqual(4)
		})
	})

	describe('consumption: false', () => {
		const parser = pipe(
			anyChar,
			repeatTill(anyCharOf('!'), { consumption: false })
		)

		it('入力が"!"の場合は、パースに成功し次の開始位置は0となる', () => {
			const input = '!'
			const output = parser({ input })

			if (output.type === 'Failure') {
				throw new Error('test failed')
			}

			expect(output.value).toEqual(['!'])
			expect(output.state.position).toEqual(0)
		})

		it('入力が"abc!"の場合は、パースに成功し次の開始位置は3となる', () => {
			const input = 'abc!'
			const output = parser({ input })

			if (output.type === 'Failure') {
				throw new Error('test failed')
			}

			expect(output.value).toEqual(['a', 'b', 'c', '!'])
			expect(output.state.position).toEqual(3)
		})

		it('入力が"abc!def"の場合は、パースに成功し次の開始位置は3となる', () => {
			const input = 'abc!def'
			const output = parser({ input })

			if (output.type === 'Failure') {
				throw new Error('test failed')
			}

			expect(output.value).toEqual(['a', 'b', 'c', '!'])
			expect(output.state.position).toEqual(3)
		})
	})

	describe('includeTillResult: false', () => {
		const parser = pipe(
			anyChar,
			repeatTill(anyCharOf('!'), { includeTillResult: false })
		)

		it('入力が"!"の場合は、パースに成功し結果として[]を取得できる', () => {
			const input = '!'
			const output = parser({ input })

			if (output.type === 'Failure') {
				throw new Error('test failed')
			}

			expect(output.value).toEqual([])
			expect(output.state.position).toEqual(1)
		})

		it('入力が"abc!"の場合は、パースに成功し結果として["a", "b", "c"]を取得できる', () => {
			const input = 'abc!'
			const output = parser({ input })

			if (output.type === 'Failure') {
				throw new Error('test failed')
			}

			expect(output.value).toEqual(['a', 'b', 'c'])
			expect(output.state.position).toEqual(4)
		})

		it('入力が"abc!def"の場合は、パースに成功し結果として["a", "b", "c"]を取得できる', () => {
			const input = 'abc!def'
			const output = parser({ input })

			if (output.type === 'Failure') {
				throw new Error('test failed')
			}

			expect(output.value).toEqual(['a', 'b', 'c'])
			expect(output.state.position).toEqual(4)
		})
	})
})
