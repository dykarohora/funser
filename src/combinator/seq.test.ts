import { seq } from './seq.js'
import { anyCharOf } from '../parser/anyCharOf.js'

describe('seq', () => {
	const parser = seq(anyCharOf('b'), anyCharOf('c'))(anyCharOf('a'))

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

	it('入力が"ab"のときは、パースに失敗する', () => {
		const input = 'ab'
		const output = parser({ input })

		expect(output.type).toEqual('Failure')
	})

	it('入力が"ac"のときは、パースに失敗する', () => {
		const input = 'ac'
		const output = parser({ input })

		expect(output.type).toEqual('Failure')
	})

	it('入力が"abc"のときは、パースに成功し結果として["a", "b", "c"]を取得できる', () => {
		const input = 'abc'
		const output = parser({ input })

		if (output.type === 'Failure') {
			throw new Error('test failed')
		}

		expect(output.value).toEqual(['a', 'b', 'c'])
		expect(output.state.position).toEqual(3)
	})
})
