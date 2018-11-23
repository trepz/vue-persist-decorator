import Vue from 'vue'
import Component from 'vue-class-component'
import { Persist } from '../src/vue-persist-decorator'

@Component
class Comp extends Vue {
    @Persist()
    hello: string = 'hi'
}
const comp = new Comp()

test('a computed property is set which matches the name of the data property', () => {
    const computed = comp.$options.computed
    expect(computed).toBeDefined()
    expect(computed!.hello).toBeDefined()
})
