import Vue from 'vue'
import Component from 'vue-class-component'
import { Persist, PersistOptions } from '../../src/vue-persist-decorator'
import { LocalStorageMock } from '../mocks/localstorage.mock'

declare var global: any

global.localStorage = new LocalStorageMock()

const factory = <T>(options?: PersistOptions, componentOptions?: any) => {
    @Component(componentOptions)
    class Comp extends Vue {
        @Persist(options)
        hello!: T
    }
    return new Comp()
}

beforeEach(() => localStorage.clear())

describe('Reading and writing', () => {
    let comp: any
    beforeEach(() => {
        comp = factory<string>()
    })

    test('a computed property is set which matches the name of the data property', () => {
        const computed = comp.$options.computed
        expect(computed).toBeDefined()
        expect(computed!.hello).toBeDefined()
    })

    test('setting the property stores in localStorage', () => {
        comp.hello = 'hi'
        const item = localStorage.getItem('comp_hello')
        expect(item).toBe(JSON.stringify({ value: 'hi' }))
    })

    test('getting the property from localStorage', () => {
        comp.hello = 'hi'
        expect(comp.hello).toBe('hi')
    })
})

describe('Storage keys', () => {
    test('it uses the class name as a key by default', () => {
        const comp = factory<string>()
        comp.hello = 'keys'
        expect(localStorage.getItem('comp_hello')).toBeDefined()
    })

    test('it uses the component name if manually set', () => {
        const comp = factory<string>({}, { name: 'different' })
        comp.hello = 'something different'
        expect(localStorage.getItem('different_hello')).toBeDefined()
    })

    test('default key name can be overridden using key option', () => {
        const comp = factory<string>({ key: 'custom_key' })
        comp.hello = 'custom'
        expect(localStorage.getItem('custom_key')).toBeDefined()
    })
})

describe('Default values', () => {
    test('it returns the default value provided if the key is never set', () => {
        const comp = factory<string>({ default: 'fall back to me' })
        expect(comp.hello).toBe('fall back to me')
    })
})
