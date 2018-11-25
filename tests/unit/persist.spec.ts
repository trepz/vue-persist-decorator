import Vue from 'vue'
import Component from 'vue-class-component'
import { Persist, PersistOptions } from '../../src/vue-persist-decorator'
import { LocalStorageMock } from '../mocks/localstorage.mock'

declare var global: any

global.localStorage = new LocalStorageMock()

const factory = (options?: PersistOptions, componentOptions?: any) => {
    @Component(componentOptions)
    class Comp extends Vue {
        @Persist(options)
        hello!: string
    }
    return new Comp()
}

describe('Reading and writing', () => {
    let comp: any
    beforeEach(() => {
        comp = factory()
    })

    test('a computed property is set which matches the name of the data property', () => {
        const computed = comp.$options.computed
        expect(computed).toBeDefined()
        expect(computed!.hello).toBeDefined()
    })

    test('setting the property stores in localStorage', () => {
        comp.hello = 'hi'
        const item = localStorage.getItem('comp_hello')
        expect(item).toBe('hi')
    })

    test('getting the property from localStorage', () => {
        expect(comp.hello).toBe('hi')
    })
})

describe('Storage keys', () => {
    test('it uses the class name as a key by default', () => {
        const comp = factory()
        comp.hello = 'keys'
        expect(localStorage.getItem('comp_hello')).toBe('keys')
    })

    test('it uses the component name if manually set', () => {
        const comp = factory({}, { name: 'different' })
        comp.hello = 'something different'
        expect(localStorage.getItem('different_hello')).toBe('something different')
    })

    test('default key name can be overridden using key option', () => {
        const comp = factory({ key: 'custom_key' })
        comp.hello = 'custom'
        expect(localStorage.getItem('custom_key')).toBe('custom')
    })
})
