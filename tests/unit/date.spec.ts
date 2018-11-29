import { parseRelativeTime } from '../../src/vue-persist-decorator'
declare var global: any

const now = Date.now()
Date.now = jest.fn().mockReturnValue(now)

describe('Date parsing function', () => {
    test('it is a function', () => {
        expect(typeof parseRelativeDate).toBe('function')
    })
})
