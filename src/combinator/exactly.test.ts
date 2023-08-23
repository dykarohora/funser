import { pipe } from './pipe.js'
import { string } from '../parser/index.js'
import { exactly } from './exactly.js'

describe('exactly', () => {
	const parser =
		pipe(
			string('hi'),
			exactly(3)
		)

	it('入力が"hihi"のときは、パースに失敗する', () => {
		const input = 'hihi'
		const output = parser({ input })

		expect(output.type).toEqual('Failure')
		expect(output.state.position).toEqual(0)
	})

	it('入力が"hihihi"のときは、パースに成功し結果として["hi", "hi", "hi"]を取得できる', () => {
		const input = 'hihihi'
		const output = parser({ input })

		if (output.type === 'Failure') {
			throw new Error('test failed')
		}

		expect(output.value).toEqual(['hi', 'hi', 'hi'])
		expect(output.state.position).toEqual(6)
	})

	it('入力が"hihihihi"のときは、パースに失敗する', () => {
		const input = 'hihihihi'
		const output = parser({ input })

		if (output.type === 'Failure') {
			throw new Error('test failed')
		}

		expect(output.value).toEqual(['hi', 'hi', 'hi'])
		expect(output.state.position).toEqual(6)
	})
})
