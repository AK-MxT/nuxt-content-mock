<template>
  <v-text-field
    dense
    :disabled="disabled"
    :label="label"
    outlined
    :readonly="!canEdit"
    :rules="rules"
    :suffix="suffix"
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

    suffix: {
      type: String,
      default: undefined
    },

    value: {
      type: String,
      default: undefined
    }
  }
})
</script>
