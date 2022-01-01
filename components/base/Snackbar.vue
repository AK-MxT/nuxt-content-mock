<template>
  <v-snackbar
    :color="color"
    :timeout="timeout"
    :value="value"
  >
    {{ text }}
  </v-snackbar>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    color: {
      type: String,
      default: 'success'
    },

    text: {
      type: String,
      default: ''
    },

    timeout: {
      type: Number,
      default: 3000
    },

    value: Boolean
  }
})
</script>
