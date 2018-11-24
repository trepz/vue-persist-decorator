export default {
    input: 'lib/vue-persist-decorator.js',
    output: {
        file: 'lib/vue-persist-decorator.umd.js',
        format: 'umd',
    },
    external: ['vue', 'vue-class-component', 'reflect-metadata'],
    exports: 'named',
    name: 'vue-persist-decorator',
    globals: {
        vue: 'Vue',
        'vue-class-component': 'VueClassComponent',
    },
}
