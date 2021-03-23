<script lang="ts">
import {
  defineComponent,
  onMounted,
  PropType,
  reactive,
  toRefs,
  watch,
} from '@nuxtjs/composition-api'

import { TBaseOtpInputTypes } from '@/types'

export default defineComponent({
  name: 'BaseOtpInput',
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'on-otp-update',
  },
  props: {
    value: { type: String, default: '' },
    inputIdLabel: { type: String, default: '', required: true },
    type: {
      type: String as PropType<TBaseOtpInputTypes>,
      default: 'text',
      validator: (v: TBaseOtpInputTypes) => {
        return ['text', 'password'].includes(v)
      },
    },
    otpCount: { type: Number, default: 6 },
    focus: { type: Boolean, default: true },
    wrapperClasses: { type: String, default: '' },
    inputsClasses: { type: String, default: '' },
  },
  setup(props, { emit }) {
    const { value: otpValue, inputIdLabel, otpCount, focus } = toRefs(props)

    let inputValues = reactive<string[]>([])

    /**
     * focus previous otp input
     * @param currentCount number
     */
    function focusPreviousInput(currentCount: number): void {
      const toFocusNumber = currentCount > 1 ? currentCount - 1 : currentCount
      document
        .getElementById(`${inputIdLabel.value}-otp-input-${toFocusNumber}`)
        ?.focus()
    }

    /**
     * focus next otp input
     * @param currentCount number
     */
    function focusNextInput(currentCount: number): void {
      const toFocusNumber =
        currentCount < otpCount.value ? currentCount + 1 : currentCount
      document
        .getElementById(`${inputIdLabel.value}-otp-input-${toFocusNumber}`)
        ?.focus()
    }

    /**
     * slice the `string` and assign value to each input.
     * only operate string is not empty
     * @param valueStr string
     */
    function setInputsValues(valueStr: string = '') {
      if (valueStr.length > 0) {
        const toSetValues = valueStr.slice(0, otpCount.value).split('')

        toSetValues.forEach((numChr, idx) => {
          // input element
          const inputEl = document.getElementById(
            `${inputIdLabel.value}-otp-input-${idx + 1}`,
          ) as HTMLInputElement

          // set input element vlaue
          inputEl.value = numChr
          // assign value to input values
          inputValues[idx] = numChr
          // focus to current loop input
          inputEl.focus()
        })
        // update the v-model back
        emit('on-otp-update', inputValues.join(''))
      }
    }

    /**
     * loop for the `otpCount` times and empty value for each input.
     */
    function clearOtpInputs() {
      // clear saved values
      inputValues = []
      // clear all input values
      for (let i = 1; i <= otpCount.value; i += 1) {
        const inputEl = document.getElementById(
          `${inputIdLabel.value}-otp-input-${i}`,
        ) as HTMLInputElement
        inputEl.value = ''
      }
      // empty the v-model back
      emit('on-otp-update', '')
    }

    function onKeyDownHandler(
      event: KeyboardEvent,
      count: number,
      inputId: string,
    ) {
      // current focused input element
      const inputEl = document.getElementById(inputId) as HTMLInputElement
      // accept 0-9
      const acceptKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

      const acceptKeysHandler = () => {
        if (event.key === 'v' || event.key === 'Enter') {
          // continue native process when paste
          ;(() => {})()
        } else if (acceptKeys.includes(event.key)) {
          // set value to input element and focus next input
          event.preventDefault()
          inputEl.value = event.key
          inputValues[count - 1] = event.key
          focusNextInput(count)
        } else {
          // prevent actions for other keys
          event.preventDefault()
        }
      }

      switch (event.key) {
        case 'Backspace':
          event.preventDefault()
          inputEl.value = ''
          inputValues[count - 1] = ''
          focusPreviousInput(count)
          emit('on-otp-update', inputValues.join(''))
          break
        case 'ArrowLeft':
          event.preventDefault()
          focusPreviousInput(count)
          break
        case 'ArrowRight':
          event.preventDefault()
          focusNextInput(count)
          break
        default:
          acceptKeysHandler()
          emit('on-otp-update', inputValues.join(''))
          break
      }
    }

    function onPasteHandler(event: ClipboardEvent) {
      // prevent from pasting another time
      event.preventDefault()

      // get clipboard text
      const clipboardText = event.clipboardData?.getData('text/plain') || ''
      // set input values
      setInputsValues(clipboardText)
    }

    onMounted(() => {
      if (focus.value) focusNextInput(0)
    })

    watch(otpValue, (newValue: string) => {
      if (newValue.length === 0) clearOtpInputs()
    })

    return {
      inputValues,
      onKeyDownHandler,
      onPasteHandler,
    }
  },
})
</script>

<template>
  <div class="flex flex-row space-x-2" :class="wrapperClasses">
    <input
      v-for="count in otpCount"
      :id="`${inputIdLabel}-otp-input-${count}`"
      :key="`${inputIdLabel}-otp-input-${count}`"
      :type="type"
      class="w-10 h-10 text-center focus:ring-0"
      :class="inputsClasses"
      @keydown="
        onKeyDownHandler($event, count, `${inputIdLabel}-otp-input-${count}`)
      "
      @paste="onPasteHandler($event)"
    />
  </div>
</template>
