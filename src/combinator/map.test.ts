import { map } from './map.js'
import { pipe } from './pipe.js'
import { string } from '../parser/string.js'
import { or } from './or.js'

describe('map', () => {
	const parser = pipe(
		string('hello'),
		or(string('good bye')),
		map((value) => value.length),
	)

	it('入力が空のときは、パースに失敗する', () => {
		const input = ''
		const output = parser({ input })

		expect(output.type).toEqual('Failure')
	})

	it.each([
		['hello', 5],
		['good bye', 8],
	])('入力が"%s"のときは、パースに成功し結果として%sを取得できる', (input, expected) => {
		const output = parser({ input })

		if (output.type === 'Failure') {
			throw new Error('test failed')
		}

		expect(output.value).toEqual(expected)
	})
})
