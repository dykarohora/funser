import { not } from './not.js'
import { string } from '../parser/index.js'

describe('not', () => {
	const parser = not(string('abc'))

	it('入力が空文字の場合は、パースに成功する', () => {
		const input = ''
		const output = parser({ input })

		if (output.type === 'Failure') {
			throw new Error('test failed')
		}

		expect(output.value).toEqual(undefined)
		expect(output.state.position).toEqual(0)
	})

	it('入力が「abc」の場合は、パースに失敗する', () => {
		const input = 'abc'
		const output = parser({ input })

		if (output.type === 'Success') {
			throw new Error('test failed')
		}

		expect(output.state.position).toEqual(0)
	})

	it('入力が「ab」の場合は、パースに成功する', () => {
		const input = 'ab'
		const output = parser({ input })

		if (output.type === 'Failure') {
			throw new Error('test failed')
		}

		expect(output.value).toEqual(undefined)
		expect(output.state.position).toEqual(0)
	})
})
