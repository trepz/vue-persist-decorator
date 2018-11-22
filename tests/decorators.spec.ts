import Vue from 'vue'
import Component from 'vue-class-component'
import { Dummy } from '../src/vue-rx-decorators'

test('dummy decorator does something', async () => {
	@Component
	class Child extends Vue {
		@Dummy()
		hello = 'unchanged'
	}

	const child = new Child()
	expect(child.$options.props).toEqual({ hello: { type: 'dummy' } })
	expect(child.hello).toBe('unchanged')
})
