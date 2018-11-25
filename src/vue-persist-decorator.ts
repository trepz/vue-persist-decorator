import { createDecorator } from 'vue-class-component'

export interface PersistOptions {
    expiry?: Date
    key?: string
    default?: any
}

export const Persist = (options: PersistOptions = {}): PropertyDecorator => {
    return createDecorator((opts, k) => {
        const name = (opts.name || '_').toLowerCase()
        const { key = `${name}_${k}`, default: defaultValue, expiry } = options

        // Create an empty computed object if one doesn't exist in options already
        if (typeof opts.computed !== 'object') {
            opts.computed = Object.create(null)
        }

        // Create getter and setter
        ;(opts.computed as any)[k] = {
            get() {
                const item = localStorage.getItem(key)
                if (!item) return defaultValue || undefined

                try {
                    const data = JSON.parse(item)
                    return data.value
                } catch (e) {
                    return
                }
            },
            set(value: any) {
                localStorage.setItem(key, JSON.stringify({ value }))
            },
        }
    })
}
