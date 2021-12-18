<template>
  <v-container
    fill-height
  >
    <auth-form />
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  layout: 'auth'
})
</script>
