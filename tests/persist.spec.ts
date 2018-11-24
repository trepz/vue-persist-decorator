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

test('a computed property is set which matches the name of the data property', () => {
    const comp = factory()
    const computed = comp.$options.computed
    expect(computed).toBeDefined()
    expect(computed!.hello).toBeDefined()
})

test('setting the property stores in localStorage', () => {
    const comp = factory()
    comp.hello = 'hi'
    expect(localStorage.store.comp_hello).toBe('hi')
})
