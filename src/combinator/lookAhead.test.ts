import { pipe } from './pipe.js'
import { string } from '../parser/string.js'
import { lookAhead } from './lookAhead.js'

describe('lookAhead', () => {
	const parser = pipe(
		string('hello'),
		lookAhead(string('world')),
	)

	it('入力が空のときは、パースに失敗する', () => {
		const input = ''
		const output = parser({ input })

		expect(output.type).toEqual('Failure')
	})

	it('入力が"helloworld"のとき、パースに成功し結果として"hello"が取得できる', () => {
		const input = 'helloworld'
		const output = parser({ input })

		if (output.type === 'Failure') {
			throw new Error('test failed')
		}

		expect(output.value).toEqual('hello')
		expect(output.state.position).toEqual(10)
	})

	it('入力が"hellohey"のとき、パースに失敗する', () => {
		const input = 'hellohey'
		const output = parser({ input })

		expect(output.type).toEqual('Failure')
		expect(output.state.position).toEqual(0)
	})
})
