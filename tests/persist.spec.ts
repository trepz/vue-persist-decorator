import Vue from 'vue'
import Component from 'vue-class-component'
import { Persist, PersistOptions } from '../src/vue-persist-decorator'
import { LocalStorageMock } from './mocks/localstorage.mock'

global.localStorage = new LocalStorageMock()

const factory = (options?: PersistOptions) => {
    @Component
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
        expect(localStorage.store.comp_hello).toBe('hi')
    })

    test('getting the property from localStorage', () => {
        expect(comp.hello).toBe('hi')
    })
})
