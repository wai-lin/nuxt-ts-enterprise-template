<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  toRefs,
} from '@nuxtjs/composition-api'

import { TBaseButtonTagNames } from '@/types'

export default defineComponent({
  name: 'BaseButton',
  props: {
    tagName: {
      type: String as PropType<TBaseButtonTagNames>,
      default: 'button',
      validator: (v: TBaseButtonTagNames) => {
        return ['button', 'a', 'n-link', 'nuxt-link'].includes(v)
      },
    },
    isCircle: { type: Boolean, default: false },
    isLoading: { type: Boolean, default: false },
    isDisabled: { type: Boolean, default: false },
  },
  setup(props) {
    const { isCircle, isDisabled } = toRefs(props)

    const dynClassNames = computed(() => {
      let c = 'px-4 py-2'
      if (isCircle.value) c = 'p-0 w-10 h-10 rounded-full'
      if (isDisabled.value) c += ' text-gray-600 bg-gray-200'
      return c
    })

    return {
      dynClassNames,
    }
  },
  computed: {
    /**
     * ! TODO: remove on vue3
     * * replace with v-bind="$attrs" and emits option
     */
    listeners(): Record<string, Function | Function[]> {
      return {
        ...this.$listeners,
        click: () => this.$emit('click'),
      }
    },
  },
})
</script>

<template>
  <component
    :is="tagName"
    :disabled="isDisabled"
    class="select-none outline-none focus:outline-none border grid place-items-center"
    :class="dynClassNames"
    v-on="listeners"
  >
    <slot v-if="isLoading" name="s-loading">
      <i class="gg-spinner-two" />
    </slot>
    <slot v-else />
  </component>
</template>
