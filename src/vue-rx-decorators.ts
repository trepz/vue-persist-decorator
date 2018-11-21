import { createDecorator } from 'vue-class-component'

/**
 * Dummy decorator.
 */
export const Dummy = (): PropertyDecorator => createDecorator((options, key) => {
	(options.props || (options.props = {}) as any)[key] = 'dummy'
})