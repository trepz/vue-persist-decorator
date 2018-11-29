import { parseRelativeDate } from '../../src/vue-persist-decorator'
declare var global: any

/**
 * Override date constructor to return a consistent date for diffing.
 */
const constantDate = new Date('2018-05-30T07:30:00.000Z')
global.Date = class extends Date {
    constructor(b: any) {
        super(b)
        if (!b) return constantDate
    }
}

describe('Date parsing function', () => {
    test('it is a function', () => {
        expect(typeof parseRelativeDate).toBe('function')
    })
})
