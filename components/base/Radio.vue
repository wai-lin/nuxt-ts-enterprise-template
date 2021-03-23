<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import kebabCase from 'lodash/kebabCase'

export default defineComponent({
  name: 'BaseRadio',
  props: {
    label: { type: String, default: '' },
  },
  setup(_props, { emit }) {
    function onChangeHandler(event: InputEvent) {
      const inputEl = event.target as HTMLInputElement
      emit('input', inputEl.checked)
    }

    return { onChangeHandler }
  },
  methods: {
    kebabCase,
  },
})
</script>

<template>
  <div class="my-2">
    <div class="flex items-center space-x-2 select-none">
      <input
        :id="kebabCase(label)"
        type="radio"
        class="inline-block rounded-full cursor-pointer"
        v-bind="$attrs"
        @change="onChangeHandler($event)"
      />
      <label :for="kebabCase(label)" class="inline-block cursor-pointer">
        {{ label }}
      </label>
    </div>
  </div>
</template>
