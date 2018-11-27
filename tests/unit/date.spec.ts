import { parseRelativeDate } from '../../src/vue-persist-decorator'

describe('Date parsing function', () => {
    test('it is a function', () => {
        expect(typeof parseRelativeDate).toBe('function')
    })
})
