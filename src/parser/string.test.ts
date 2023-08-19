import { string } from './string.js'

describe('string', () => {
	const parser = string('abc')

	it('入力が空のときはパースに失敗する', () => {
		const input = ''
		const output = parser({ input })

		expect(output.type).toEqual('Failure')
	})

	it('入力が"abc"のときは、パースに成功し結果として"abc"を取得できる', () => {
		const input = 'abc'
		const output = parser({ input })

		if (output.type === 'Failure') {
			throw new Error('test failed')
		}

		expect(output.value).toEqual('abc')
		expect(output.state.position).toEqual(3)
	})

	it('入力が"abcd"のときは、パースに成功し結果として"abc"を取得できる', () => {
		const input = 'abcd'
		const output = parser({ input })

		if (output.type === 'Failure') {
			throw new Error('test failed')
		}

		expect(output.value).toEqual('abc')
		expect(output.state.position).toEqual(3)
	})

	it('入力が"ab"のときはパースに失敗する', () => {
		const input = 'ab'
		const output = parser({ input })

		expect(output.type).toEqual('Failure')
	})

	it('入力が"aabc"のときはパースに失敗する', () => {
		const input = 'aabc'
		const output = parser({ input })

		expect(output.type).toEqual('Failure')
	})

	it('入力が"aabc"でパースの開始位置が1のときは、パースに成功し結果として"abc"を取得できる', () => {
		const input = 'aabc'
		const output = parser({ input, position: 1 })

		if (output.type === 'Failure') {
			throw new Error('test failed')
		}

		expect(output.value).toEqual('abc')
		expect(output.state.position).toEqual(4)
	})
})
