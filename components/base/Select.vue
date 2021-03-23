<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import kebabCase from 'lodash/kebabCase'

export default defineComponent({
  name: 'BaseSelect',
  props: {
    idLabel: { type: String, default: '', required: true },
    options: { type: Array, default: () => [] },
  },
  methods: {
    kebabCase,
  },
})
</script>

<template>
  <select class="select-none rounded">
    <template v-for="(opt, idx) in options">
      <slot :data="{ id: `${kebabCase(idLabel)}-${idx}`, idx, option: opt }" />
    </template>
  </select>
</template>
