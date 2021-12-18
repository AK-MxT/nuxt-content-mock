<template>
  <v-data-table />
</template>

<script lang="ts">
import { defineComponent, ref, useAsync, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  setup () {
    const {
      $content
    } = useContext()

    const items = ref<any>([])

    useAsync(async () => {
      const query = await $content('data')
      items.value = await query.fetch()
    })

    console.log(items)
  }
})
</script>
