<template>
  <v-textarea
    dense
    :disabled="disabled"
    :label="label"
    outlined
    :readonly="!canEdit"
    :rules="rules"
    :value="value"
    @input="$emit('input', $event)"
  />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    canEdit: Boolean,
    disabled: Boolean,

    label: {
      type: String,
      default: undefined
    },

    rules: {
      type: Array,
      default: () => []
    },

    value: {
      type: String,
      default: undefined
    }
  }
})
</script>
