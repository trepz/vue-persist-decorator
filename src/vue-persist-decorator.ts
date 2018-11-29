import { createDecorator } from 'vue-class-component'

export interface PersistOptions {
    expiry?: string
    key?: string
    default?: any
}

export interface PersistObject {
    value: string
    expiry?: number
    default?: any
}

export function Persist(options: PersistOptions = {}): PropertyDecorator {
    return createDecorator((opts, k) => {
        const name = (opts.name || '_').toLowerCase()
        const { key = `${name}_${k}`, default: defaultValue, expiry: expiryString } = options

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
                    const data: PersistObject = JSON.parse(item)
                    return data.value
                } catch (e) {
                    return
                }
            },
            set(value: any) {
                const persist: PersistObject = { value }
                if (expiryString) persist.expiry = parseRelativeTime(expiryString)
                localStorage.setItem(key, JSON.stringify(persist))
            },
        }
    })
}

export function parseRelativeTime(dateString: string): number {
    const epoch = Date.now()
    const dateArray: string[] = dateString.split(/([a-zA-Z]{1})/)
    if (isNaN(+dateArray[0])) throw new Error('Failed to parse time.')

    const input = Math.round(+dateArray[0])
    const extensions: { [key: string]: number } = {
        ms: 1,
        s: 1000,
        m: 1000 * 60,
        h: 1000 * 60 * 60,
        d: 1000 * 60 * 60 * 24,
    }
    const multiplier: number = extensions[dateArray[1]] || extensions.h
    return epoch + input * multiplier
}
