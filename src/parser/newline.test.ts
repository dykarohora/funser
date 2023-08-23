import { pipe, seq } from '../combinator/index.js'
import { string } from './string.js'
import { newline } from './newline.js'

describe('newline', () => {
	const parser = pipe(
		string('hello'),
		seq(newline, string('world')),
	)

	it('CRをパースできる', () =>{
		const input = 'hello\rworld'
		const output = parser({ input })

		if (output.type === 'Failure') {
			throw new Error('test failed')
		}

		expect(output.value).toEqual(['hello', '\r', 'world'])
		expect(output.state.position).toEqual(11)
	})

	it('LFをパースできる', () => {
		const input = 'hello\nworld'
		const output = parser({ input })

		if (output.type === 'Failure') {
			throw new Error('test failed')
		}

		expect(output.value).toEqual(['hello', '\n', 'world'])
		expect(output.state.position).toEqual(11)
	})

	it('CRLFをパースできる', () => {
		const input = 'hello\r\nworld'
		const output = parser({ input })

		if (output.type === 'Failure') {
			throw new Error('test failed')
		}

		expect(output.value).toEqual(['hello', '\r\n', 'world'])
		expect(output.state.position).toEqual(12)
	})
})
