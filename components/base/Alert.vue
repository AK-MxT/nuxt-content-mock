<template>
  <v-alert
    :value="value"
    :dismissible="dismissible"
    :type="type"
  >
    {{ message }}
  </v-alert>
</template>

<script lang="ts">
import { defineComponent, watch } from '@nuxtjs/composition-api'

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
    watch(() => props.value, (newVal: boolean) => {
      if (!newVal) { emit('close') }
    })
  }
})
</script>
