import { pipe } from './pipe.js'
import { string } from '../parser/string.js'
import { seq } from './seq.js'
import { Parser } from '../parser/types.js'
import { or } from './or.js'

describe('pipe', () => {
	it('test1', () => {
		const parser = pipe(
			string('hello '),
			seq(string('world'), string('!!'))
		)

		const output = parser({input: 'hello world!!'})
		if(output.type === 'Failure'){
			throw new Error('test failed')
		}

		expect(output.value).toEqual(['hello ', ['world', '!!']])
		expect(output.state.position).toEqual(13)
	})

	it('test2', () => {
		const parser = pipe(
			seq(string('Good '), string('morning'), string('!! ')),
			seq(string('Good '), string('afternoon'), string('!! ')),
		)
		const output = parser({input: 'Good morning!! Good afternoon!! '})
		if(output.type === 'Failure'){
			throw new Error('test failed')
		}

		expect(output.value).toEqual([['Good ', 'morning', '!! '], ['Good ', 'afternoon', '!! ']])
		expect(output.state.position).toEqual(32)
	})

	it('test3', () => {
		const parser = pipe(
			string('hello'),
			or(string('world'))
		)

		const output1 = parser({input: 'hello'})
		if(output1.type === 'Failure'){
			throw new Error('test failed')
		}

		expect(output1.value).toEqual('hello')
		expect(output1.state.position).toEqual(5)

		const output2 = parser({input: 'world'})
		if(output2.type === 'Failure'){
			throw new Error('test failed')
		}

		expect(output2.value).toEqual('world')
		expect(output2.state.position).toEqual(5)
	})
})
