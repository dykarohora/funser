import { anyChar } from './anyChar.js'

describe('anyChar', () => {
	it('入力が空文字のときは、パースに失敗する', () => {
		const input = ''
		const output = anyChar({ input })

		expect(output.type).toEqual('Failure')
	})

	it('入力が"a"のときは、パースに成功し結果として"a"を取得できる', () => {
		const input = 'a'
		const output = anyChar({ input })

		if (output.type === 'Failure') {
			throw new Error('test failed')
		}

		expect(output.value).toEqual('a')
		expect(output.state.position).toEqual(1)
	})

	it('入力が"ab"のときは、パースに成功し結果として"a"を取得できる', () => {
		const input = 'ab'
		const output = anyChar({ input })

		if (output.type === 'Failure') {
			throw new Error('test failed')
		}

		expect(output.value).toEqual('a')
		expect(output.state.position).toEqual(1)
	})

	it('入力が"ab"でパースの開始位置が1のときは、パースに成功し結果として"b"を取得できる', () => {
		const input = 'ab'
		const output = anyChar({ input, position: 1 })

		if (output.type === 'Failure') {
			throw new Error('test failed')
		}

		expect(output.value).toEqual('b')
		expect(output.state.position).toEqual(2)
	})

	it('入力が"🍎"のとき、パースに成功し結果としてサロゲートペアの前半部分を取得できる', () => {
		const input = '🍎'
		const output = anyChar({ input })

		if (output.type === 'Failure') {
			throw new Error('test failed')
		}

		expect(output.value).toEqual(input[0])
		expect(output.value.charCodeAt(0)).toEqual(55356)
		expect(output.state.position).toEqual(1)

	})
})
