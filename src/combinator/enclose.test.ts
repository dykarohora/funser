import { pipe } from './pipe.js'
import { anyCharOf, noCharOf } from '../parser/index.js'
import { repeat } from './repeat.js'
import { enclose } from './enclose.js'

describe('enclose', () => {
	const parser = pipe(
		noCharOf('"'),
		repeat(),
		enclose(anyCharOf('"'))
	)

	it('入力が空文字の場合は、パースに失敗する', () => {
		const input = ''
		const output = parser({ input })

		expect(output.type).toEqual('Failure')
		expect(output.state.position).toEqual(0)
	})

	it('入力が「"abc"」の場合は、パースに成功し結果として[\'"\', \'a\', \'b\', \'c\', \'"\']を取得できる', () => {
		const input = '"abc"'
		const output = parser({ input })

		if (output.type === 'Failure') {
			throw new Error('test failed')
		}

		expect(output.value).toEqual(['"', ['a', 'b', 'c'], '"'])
		expect(output.state.position).toEqual(5)
	})
})
