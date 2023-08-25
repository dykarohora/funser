import { string } from '../parser/string.js'
import { seq } from './seq.js'
import { seqParser as sequential } from '../parser/seqParser.js'
import { or } from './or.js'
import { orParser as alternative } from '../parser/orParser.js'
import { pipe } from './pipe.js'
import { Parser } from '../types/index.js'

describe('pipe', () => {
	it('引数が一つのとき、引数に渡したパーサがそのまま返ってくる', () => {
		const parser = pipe(
			string('hello')
		)

		const output = parser({ input: 'hello' })
		if (output.type === 'Failure') {
			throw new Error('test failed')
		}

		expect(output.value).toEqual('hello')
	})

	it('一つのコンビネータを適用できる', () => {
		const parser = pipe(
			string('hello'),
			or(string('good bye'))
		)

		const output1 = parser({ input: 'hello' })
		if (output1.type === 'Failure') {
			throw new Error('test failed')
		}

		expect(output1.value).toEqual('hello')

		const output2 = parser({ input: 'good bye' })
		if (output2.type === 'Failure') {
			throw new Error('test failed')
		}

		expect(output2.value).toEqual('good bye')
	})

	it('二つのコンビネータを適用できる', () => {
		const parser = pipe(
			alternative(string('hello '), string('good bye ')),
			seq(alternative(string('cat'), string('dog'))),
			seq(string('!!'))
		)

		const output1 = parser({ input: 'hello cat!!' })
		if (output1.type === 'Failure') {
			throw new Error('test failed')
		}

		expect(output1.value).toEqual([['hello ', 'cat'], '!!'])

		const output2 = parser({ input: 'good bye dog!!' })
		if (output2.type === 'Failure') {
			throw new Error('test failed')
		}

		expect(output2.value).toEqual([['good bye ', 'dog'], '!!'])
	})

	it('test1', () => {
		const parser = pipe(
			string('hello '),
			seq(string('world'), string('!!'))
		)

		const output = parser({ input: 'hello world!!' })
		if (output.type === 'Failure') {
			throw new Error('test failed')
		}

		expect(output.value).toEqual(['hello ', 'world', '!!'])
		expect(output.state.position).toEqual(13)
	})

	it('test2', () => {
		const parser = pipe(
			sequential(string('Good '), string('morning'), string('!! ')),
			seq(string('Good '), string('afternoon'), string('!! ')),
		)
		const output = parser({ input: 'Good morning!! Good afternoon!! ' })
		if (output.type === 'Failure') {
			throw new Error('test failed')
		}

		expect(output.value).toEqual([['Good ', 'morning', '!! '], 'Good ', 'afternoon', '!! '])
		expect(output.state.position).toEqual(32)
	})

	it('test3', () => {
		const parser = pipe(
			string('hello'),
			or(string('world'))
		)

		const output1 = parser({ input: 'hello' })
		if (output1.type === 'Failure') {
			throw new Error('test failed')
		}

		expect(output1.value).toEqual('hello')
		expect(output1.state.position).toEqual(5)

		const output2 = parser({ input: 'world' })
		if (output2.type === 'Failure') {
			throw new Error('test failed')
		}

		expect(output2.value).toEqual('world')
		expect(output2.state.position).toEqual(5)
	})

	it('test4', () => {
		const parser2 = pipe(
			string('hello'),
			or(string('world'))
		)

		const parser3 = pipe(
			string('a'),
			seq(string('b')),
		)

		const parser = pipe(
			string('a'),
			seq(string('b')),
			seq(string('c'))
		)

		const output1 = parser({ input: 'abc' })
		if (output1.type === 'Failure') {
			throw new Error('test failed')
		}

		expect(output1.value).toEqual([['a', 'b'], 'c'])
	})
})
