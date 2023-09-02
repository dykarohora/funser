import { pipe } from './pipe.js'
import { anyChar, anyCharOf, orParser, string } from '../parser/index.js'
import { subtract } from './subtract.js'
import { repeat } from './repeat.js'

describe('subtract', () => {
	const parser = pipe(
		anyCharOf('abc'),
		subtract(anyCharOf('b'))
	)

	it('入力が空文字の場合は、パースに失敗する', () => {
		const input = ''
		const output = parser({ input })

		expect(output.type).toEqual('Failure')
		expect(output.state.position).toEqual(0)
	})

	it('入力が「a」の場合は、パースに成功し結果として「a」を取得できる', () => {
		const input = 'a'
		const output = parser({ input })

		if (output.type === 'Failure') {
			throw new Error('test failed')
		}

		expect(output.value).toEqual('a')
		expect(output.state.position).toEqual(1)
	})

	it('入力が「b」の場合は、パースに失敗する', () => {
		const input = 'b'
		const output = parser({ input })

		expect(output.type).toEqual('Failure')
		expect(output.state.position).toEqual(0)
	})

	it('入力が「c」の場合は、パースに成功し結果として「c」を取得できる', () => {
		const input = 'c'
		const output = parser({ input })

		if (output.type === 'Failure') {
			throw new Error('test failed')
		}

		expect(output.value).toEqual('c')
		expect(output.state.position).toEqual(1)
	})

	it('入力が「d」の場合は、パースに失敗する', () => {
		const input = 'd'
		const output = parser({ input })

		expect(output.type).toEqual('Failure')
		expect(output.state.position).toEqual(0)
	})

	it('入力が「ba」でパースの開始位置が1の場合は、パースに成功し結果として「a」を取得できる', () => {
		const input = 'ba'
		const output = parser({ input, position: 1 })

		if (output.type === 'Failure') {
			throw new Error('test failed')
		}

		expect(output.value).toEqual('a')
		expect(output.state.position).toEqual(2)
	})
})

it('p', () => {
	const parser = pipe(
		anyChar,
		repeat(),
		subtract(anyCharOf('b'))
	)

	const input = 'abc'
	const output = parser({ input })

	console.log(output)
})
