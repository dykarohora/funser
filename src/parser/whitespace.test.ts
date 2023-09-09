import { whitespace } from './whitespace.js'
import { seqParser } from './seqParser.js'
import { string } from './string.js'

describe('whitespace', () => {
	const parser = seqParser(string('hello'), whitespace, string('world'))

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

	it('TABをパースできる', () => {
		const input = 'hello\tworld'
		const output = parser({ input })

		if (output.type === 'Failure') {
			throw new Error('test failed')
		}

		expect(output.value).toEqual(['hello', '\t', 'world'])
		expect(output.state.position).toEqual(11)
	})

	it('スペースをパースできる', () => {
		const input = 'hello world'
		const output = parser({ input })

		if (output.type === 'Failure') {
			throw new Error('test failed')
		}

		expect(output.value).toEqual(['hello', ' ', 'world'])
		expect(output.state.position).toEqual(11)
	})
})
