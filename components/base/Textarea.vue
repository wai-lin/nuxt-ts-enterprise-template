<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'BaseInput',
  props: {
    label: { type: String, default: '' },
  },
})
</script>

<template>
  <textarea autocomplete="on" class="w-full rounded border focus:ring-0" />
</template>
