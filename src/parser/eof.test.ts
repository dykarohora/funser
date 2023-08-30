import { eof } from './eof.js'

describe('eof', () => {
	it('入力が空のときは、パースに成功し結果としてundefinedを取得できる', () => {
		const parser = eof
		const input = ''
		const output = parser({ input })

		if (output.type === 'Failure') {
			throw new Error('test failed')
		}

		expect(output.value).toBeUndefined()
		expect(output.state.position).toEqual(0)
	})

	it('入力が"a"のときは、パースに失敗する', () => {
		const parser = eof
		const input = 'a'
		const output = parser({ input })

		expect(output.type).toEqual('Failure')
		expect(output.state.position).toEqual(0)
	})

	it('入力が"a"でパースの開始位置が1のときは、パースに成功する', () => {
		const parser = eof
		const input = 'a'
		const output = parser({ input, position: 1 })

		if (output.type === 'Failure') {
			throw new Error('test failed')
		}

		expect(output.value).toBeUndefined()
		expect(output.state.position).toEqual(1)
	})
})
