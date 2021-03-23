<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'BaseInput',
  props: {
    type: {
      type: String,
      default: 'text',
      validator(v: string) {
        return [
          'text',
          'password',
          'email',
          'number',
          'tel',
          'date',
          'time',
          'datetime-local',
          'month',
          'week',
          'url',
        ].includes(v)
      },
    },
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: (e: InputEvent) => {
          const element = e.target as HTMLInputElement
          this.$emit('input', element.value)
        },
      }
    },
  },
})
</script>

<template>
  <input
    :type="type"
    autocomplete="on"
    class="block w-full border focus:ring-0"
    v-on="listeners"
  />
</template>
