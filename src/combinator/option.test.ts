import { string } from '../parser/index.js'
import { option } from './option.js'

describe('option', () => {
	const parser = option(string('hello'))

	it('入力が空のときはパースに成功する', () => {
		const input = ''
		const output = parser({ input })

		if (output.type === 'Failure') {
			throw new Error('test failed')
		}

		expect(output.value).toEqual({ type: 'None' })
		expect(output.state.position).toEqual(0)
	})

	it('入力がhelloのときはパースに成功する', () => {
		const input = 'hello'
		const output = parser({ input })

		if (output.type === 'Failure') {
			throw new Error('test failed')
		}

		expect(output.value).toEqual({ type: 'Some', value: 'hello' })
		expect(output.state.position).toEqual(5)
	})

	it('入力がworldのときはパースに成功する', () => {
		const input = 'world'
		const output = parser({ input })

		if (output.type === 'Failure') {
			throw new Error('test failed')
		}

		expect(output.value).toEqual({ type: 'None' })
		expect(output.state.position).toEqual(0)
	})
})
