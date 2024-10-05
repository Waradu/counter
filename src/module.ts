import { defineNuxtModule, createResolver, addComponentsDir } from '@nuxt/kit'

export type ModuleOptions = object

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'wrdu-counter',
    configKey: 'wrdu-counter',
    compatibility: {
      nuxt: '>=3.10.0',
    },
  },
  defaults: {},
  setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url)

    addComponentsDir({
      path: resolver.resolve('./runtime/components'),
      pathPrefix: false,
      prefix: '',
      global: true,
    })
  },
})
