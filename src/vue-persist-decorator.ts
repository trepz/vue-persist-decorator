import { createDecorator } from 'vue-class-component'

export interface PersistOptions {
    expiry?: Date
    key?: string
}

export const Persist = (options: PersistOptions = {}): PropertyDecorator => {
    return createDecorator((opts, k) => {
        const { key = `${opts.name}_${k}`, expiry } = options
        if (typeof opts.computed !== 'object') opts.computed = Object.create(null)
        ;(opts.computed as any)[k] = {
            get() {
                return ''
            },
            set() {},
        }
    })
}
