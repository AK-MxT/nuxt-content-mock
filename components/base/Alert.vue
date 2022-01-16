<template>
  <v-alert
    v-model="alert"
    :dismissible="dismissible"
    :type="type"
  >
    {{ message }}
  </v-alert>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    dismissible: Boolean,

    message: {
      type: String,
      required: true
    },

    type: {
      type: String,
      default: 'error'
    },

    value: Boolean
  },

  setup (props, { emit }) {
    const alert = ref(props.value)

    watch(() => props.value, (newVal) => {
      alert.value = newVal
    })

    watch(alert, (newVal) => {
      if (!newVal) {
        emit('close')
      }
    })

    return {
      alert
    }
  }
})
</script>
