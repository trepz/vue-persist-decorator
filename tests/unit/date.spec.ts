import { parseRelativeTime } from '../../src/vue-persist-decorator'
declare var global: any

const now = Date.now()
Date.now = jest.fn().mockReturnValue(now)

describe('Date parsing function', () => {
    test('it returns the correct relative time', () => {
        let time

        time = parseRelativeTime('5000ms')
        expect(time - now).toBe(1000 * 5)

        time = parseRelativeTime('5s')
        expect(time - now).toBe(1000 * 5)

        time = parseRelativeTime('10m')
        expect(time - now).toBe(1000 * 60 * 10)

        time = parseRelativeTime('2h')
        expect(time - now).toBe(1000 * 60 * 60 * 2)

        time = parseRelativeTime('221d')
        expect(time - now).toBe(1000 * 60 * 60 * 24 * 221)
    })
})
