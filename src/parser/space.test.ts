import { space } from './space.js'

describe('space', () => {
	const parser = space

	it('入力が空のときは、パースに失敗する', () => {
		const input = ''
		const output = parser({ input })

		expect(output.type).toEqual('Failure')
		expect(output.state.position).toEqual(0)
	})

	it('入力が" "(半角スペース)のときは、パースに成功し結果として" "を取得できる', () => {
		const input = ' '
		const output = parser({ input })

		if (output.type === 'Failure') {
			throw new Error('test failed')
		}

		expect(output.value).toEqual(' ')
		expect(output.state.position).toEqual(1)
	})


	it('入力が"\t"(タブ)のときは、パースに成功し結果として"\t"を取得できる', () => {
		const input = '\t'
		const output = parser({ input })

		if (output.type === 'Failure') {
			throw new Error('test failed')
		}

		expect(output.value).toEqual('\t')
		expect(output.state.position).toEqual(1)
	})

	it('入力が"　"(全角スペース)のときは、パースに失敗する', () => {
		const input = '　'
		const output = parser({ input })

		expect(output.type).toEqual('Failure')
		expect(output.state.position).toEqual(0)
	})
})

