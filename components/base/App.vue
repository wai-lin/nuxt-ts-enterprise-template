<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'BaseApp',
})
</script>

<template>
  <div>
    <slot />
  </div>
</template>
