import Vue from 'vue'
import Component from 'vue-class-component'
import { Persist } from '../src/vue-persist-decorator'
import { LocalStorageMock } from './mocks/localstorage.mock'

global.localStorage = new LocalStorageMock()

@Component
class Comp extends Vue {
    @Persist()
    hello!: string
}
const comp = new Comp()

test('a computed property is set which matches the name of the data property', () => {
    const computed = comp.$options.computed
    expect(computed).toBeDefined()
    expect(computed!.hello).toBeDefined()
})
