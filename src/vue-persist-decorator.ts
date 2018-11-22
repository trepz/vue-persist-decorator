import { createDecorator } from 'vue-class-component'

export interface PersistOptions {
  expiry?: Date
  key?: string
}

export const Persist = (options?: PersistOptions): PropertyDecorator => {
  return createDecorator((componentOptions, k) => {
    const { key, expiry } = options || ({ key: `component-${componentOptions.name}-key-${k}` } as PersistOptions)
  })
}
