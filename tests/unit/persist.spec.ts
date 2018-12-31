import 'jsdom-global/register'
import Vue from 'vue'
import Component from 'vue-class-component'
import { mount } from '@vue/test-utils'
import { Persist, PersistOptions } from '../../src/vue-persist-decorator'
import { LocalStorageMock } from '../mocks/localstorage.mock'

declare var global: any
global.localStorage = new LocalStorageMock()

const factory = <T>(value: T, options?: PersistOptions, componentOptions?: any) => {
    @Component({
        template: `
            <div>{{ hello }}</div>
        `,
        ...componentOptions,
    })
    class Comp extends Vue {
        @Persist(options)
        hello: T = value
    }
    return Comp
}

beforeEach(() => localStorage.clear())

describe('Reading and writing', () => {
    test('setting the property stores in localStorage', done => {
        const wrapper = mount(factory<string>(''))
        wrapper.setData({ hello: 'hi' })
        wrapper.vm.$nextTick(() => {
            const item = localStorage.getItem('comp_hello')
            expect(item).toBe(JSON.stringify({ value: 'hi' }))
            done()
        })
    })

    test('getting the property from localStorage', () => {
        localStorage.setItem(
            'comp_hello',
            JSON.stringify({
                value: 'greetings',
            }),
        )
        const wrapper = mount(factory<string>(''))
        expect(wrapper.vm.hello).toBe('greetings')
    })
})

describe('Storage keys', () => {
    test('it uses the class name as a key by default', () => {
        const wrapper = mount(factory<string>(''))
        wrapper.vm.hello = 'keys'
        expect(localStorage.getItem('comp_hello')).toBeDefined()
    })

    test('it uses the component name if manually set', () => {
        const wrapper = mount(factory<string>('', {}, { name: 'different' }))
        wrapper.vm.hello = 'something different'
        expect(localStorage.getItem('different_hello')).toBeDefined()
    })

    test('default key name can be overridden using key option', () => {
        const wrapper = mount(factory<string>('', { key: 'custom_key' }))
        wrapper.vm.hello = 'custom'
        expect(localStorage.getItem('custom_key')).toBeDefined()
    })
})

// describe('Expiry date', () => {
//     test('expiry key is not added by default', done => {
//         const comp = factory<string>('')
//         comp.$mount()
//         comp.hello = 'hi'

//         comp.$nextTick(() => {
//             const obj = JSON.parse(localStorage.getItem('comp_hello') || '{}')
//             expect(obj.value).toBe('hi')
//             expect(obj.expiry).toBeUndefined()
//             done()
//         })
//     })

//     test('adding expiry settings creates expiry prop as a date', done => {
//         const comp = factory<string>('', { expiry: '2h' })
//         comp.$mount()
//         comp.hello = 'hey'

//         comp.$nextTick(() => {
//             const obj = JSON.parse(localStorage.getItem('comp_hello') || '{}')
//             expect(obj.value).toBe('hey')
//             expect(new Date(obj.expiry).getDate()).not.toBeNaN()
//             done()
//         })
//     })
// })
