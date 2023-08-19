import { anyCharOf } from './anyCharOf.js'

describe('anyCharOf', () => {
	const parser = anyCharOf('ab')

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

	it('入力が"c"のときは、パースに失敗する', () => {
		const input = 'c'
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
