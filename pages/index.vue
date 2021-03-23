<script lang="ts">
import { computed, defineComponent, reactive } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'PagesIndex',
  props: {
    msg: { type: String, default: 'Hello' },
  },
  setup(props) {
    const { msg } = reactive(props)

    const msgComputed = computed(() => msg + ' World!')

    return { msgComputed }
  },
})
</script>

<template>
  <div>
    {{ msg }}, {{ msgComputed }}
    <BaseButton
      class="border-none text-white bg-green-400 hover:bg-green-300 active:bg-green-500"
    >
      Button
    </BaseButton>
  </div>
</template>
