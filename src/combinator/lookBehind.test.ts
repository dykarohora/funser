import { pipe } from './pipe.js'
import { string } from '../parser/string.js'
import { lookBehind } from './lookBehind.js'

describe('lookBehind', () => {
	const parser = pipe(
		string('hello'),
		lookBehind(string('world')),
	)

	it('入力が空のときは、パースに失敗する', () => {
		const input = ''
		const output = parser({ input })

		expect(output.type).toEqual('Failure')
		expect(output.state.position).toEqual(0)
	})

	it('入力が"helloworld"のとき、パースに成功し結果として"world"が取得できる', () => {
		const input = 'helloworld'
		const output = parser({ input })

		if (output.type === 'Failure') {
			throw new Error('test failed')
		}

		expect(output.value).toEqual('world')
		expect(output.state.position).toEqual(10)
	})

	it('入力が"hellohey"のとき、パースに失敗する', () => {
		const input = 'hellohey'
		const output = parser({ input })

		expect(output.type).toEqual('Failure')
		expect(output.state.position).toEqual(0)
	})
})
