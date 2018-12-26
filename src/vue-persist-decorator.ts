import { createDecorator } from 'vue-class-component'

export interface PersistOptions {
    expiry?: string
    key?: string
}

export interface PersistObject {
    value: string
    expiry?: number
}

export function Persist(options: PersistOptions = {}): PropertyDecorator {
    return createDecorator((opts, k) => {
        const name = (opts.name || '_').toLowerCase()
        const { key = `${name}_${k}`, expiry: expiryString } = options

        // Create an empty watch object if one doesn't exist in options already
        if (typeof opts.watch !== 'object') {
            opts.watch = Object.create(null)
        }

        // Watch decorated property and store changes
        ;(opts.watch as any)[k] = {
            handler(value: any) {
                const persist: PersistObject = { value }
                if (expiryString) persist.expiry = parseRelativeTime(expiryString)
                localStorage.setItem(key, JSON.stringify(persist))
            },
        }
    })
}

export function parseRelativeTime(dateString: string): number {
    const epoch = Date.now()
    const dateArray: string[] = dateString.split(/([a-zA-Z]+)/)
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
