import { pipe } from './pipe.js'
import { anyChar } from '../parser/index.js'
import { repeat } from './repeat.js'
import { validate } from './validate.js'

describe('validate', () => {
	const parser = pipe(
		anyChar,
		repeat({ min: 1 }),
		validate(({ value }) =>
			value.length === 3
				? true
				: { reason: 'invalid length' })
	)

	it('入力が「ab」の場合はパースに失敗する', () => {
		const input = 'ab'
		const output = parser({ input })

		expect(output.type).toEqual('Failure')
		expect(output.state.position).toEqual(0)
	})

	it('入力が「abc」の場合はパースに成功する', () => {
		const input = 'abc'
		const output = parser({ input })

		if (output.type === 'Failure') {
			throw new Error('test failed')
		}

		expect(output.value).toEqual(['a', 'b', 'c'])
		expect(output.state.position).toEqual(3)
	})

	it('入力が「abcd」の場合はパースに失敗する', () => {
		const input = 'abcd'
		const output = parser({ input })

		expect(output.type).toEqual('Failure')
		expect(output.state.position).toEqual(0)
	})
})
