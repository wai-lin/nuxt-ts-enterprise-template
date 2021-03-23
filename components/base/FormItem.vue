<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import kebabCase from 'lodash/kebabCase'

export default defineComponent({
  name: 'BaseFormItem',
  props: {
    label: { type: String, default: '' },
    message: { type: String, default: '' },
  },
  methods: {
    kebabCase,
  },
})
</script>

<template>
  <div class="my-2">
    <label :for="kebabCase(label)" class="cursor-pointer block text-base">
      {{ label }}
    </label>
    <div class="mb-2 text-sm">
      <slot name="s-message" :message="message">
        <p class="text-red-500">{{ message }}</p>
      </slot>
    </div>
    <slot :data="{ id: kebabCase(label), label }" />
  </div>
</template>
