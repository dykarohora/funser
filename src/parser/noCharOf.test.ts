import { noCharOf } from './noCharOf.js'
import { pipe, repeat } from '../combinator/index.js'

describe('noCharOf', () => {
	const parser = noCharOf('ab')

	it('入力が空のときは、パースに失敗する', () => {
		const input = ''
		const output = parser({ input })

		expect(output.type).toEqual('Failure')
		expect(output.state.position).toEqual(0)
	})

	it('入力が"a"のときは、パースに失敗する', () => {
		const input = 'a'
		const output = parser({ input })

		expect(output.type).toEqual('Failure')
		expect(output.state.position).toEqual(0)
	})

	it('入力が"b"のときは、パースに失敗する', () => {
		const input = 'b'
		const output = parser({ input })

		expect(output.type).toEqual('Failure')
		expect(output.state.position).toEqual(0)
	})

	it('入力が"c"のときは、パースに成功し結果として"c"を取得できる', () => {
		const input = 'c'
		const output = parser({ input })

		if (output.type === 'Failure') {
			throw new Error('test failed')
		}

		expect(output.value).toEqual('c')
		expect(output.state.position).toEqual(1)
	})

	it('入力が"ca"のときは、パースに成功し結果として"c"を取得できる', () => {
		const input = 'ca'
		const output = parser({ input })

		if (output.type === 'Failure') {
			throw new Error('test failed')
		}

		expect(output.value).toEqual('c')
		expect(output.state.position).toEqual(1)
	})

	it('入力が"ca"でパースの開始位置が1のときは、パースに失敗する', () => {
		const input = 'ca'
		const output = parser({ input, position: 1 })

		expect(output.type).toEqual('Failure')
		expect(output.state.position).toEqual(1)
	})
})

it('a', () => {
	const parser = pipe(
		noCharOf([`\r`, '\n', '\r\n'].join('')),
		repeat()
	)

	const input1 = 'abc\rdef'
	const input2 = 'abc\r\ndef'
	const input3 = 'abc\ndef'

	const output1 = parser({ input: input1 })
	const output2 = parser({ input: input2 })
	const output3 = parser({ input: input3 })

	const a = input2[4]
	console.log(input2[3])
})
