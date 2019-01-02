# vue-persist-decorator

[![Build Status](https://travis-ci.org/trepz/vue-persist-decorator.svg?branch=master)](https://travis-ci.org/trepz/vue-persist-decorator)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Store component properties in localStorage using the `@Persist()` decorator with [vue class components](https://github.com/vuejs/vue-class-component). Properties will be stored on change and restored from localStorage when the component mounts.

```javascript
import Vue from 'vue'
import Component from 'vue-class-component'
import { Persist } from 'vue-persist-decorator'

@Component
export default class App extends Vue {
    @Persist()
    myProperty = 'default value'
}
```

## Installing

```
yarn add -D vue-persist-decorator
```

or

```
npm i vue-persist-decorator --save-dev
```

## Options

The `@Persist` decorator can receive an options object with the following properties:

> ### expiry : string

Properties can be set to expire using relative time. If the expiry date has passed when the component mounts, the value will not be restored. The relative time string is a number + ms/s/m/h/d. If no unit of time is provided the number will default to hours.

```javascript
@Component
export default class App extends Vue {
    @Persist({ expiry: '5m' })
    myProperty = 'I will only be restored within 5 minutes of being changed.'
}
```

> ### key : string

Set a custom key for the persist object in localStorage. By default the key name is `componentName_propertyName`.

```javascript
@Component
export default class App extends Vue {
    @Persist({ key: 'custom_local_storage_key' })
    myProperty = 'By default my localStorage key would be app_myProperty.'
}
```

> ### deep : boolean

Vue watcher option, defaults to true. Set this to false if you don't want changes to nested values to cause your property to be stored.

```javascript
@Component
export default class App extends Vue {
    @Persist({ deep: false })
    myProperty = {
        hello: 'Changing the value of hello directly will not cause myProperty to be stored if deep is false.',
    }
}
```

> ### immediate : boolean

Vue watcher option, defaults to false.
