<template>
  <v-container />
</template>

<script lang="ts">
import { defineComponent, ref, useAsync, useContext, useRoute, useRouter } from '@nuxtjs/composition-api'
import type { TableData } from '~/types/data'

export default defineComponent({
  setup () {
    const {
      $content
    } = useContext()
    const route = useRoute()
    const router = useRouter()

    const data = ref<any>([])
    const item = ref<TableData>()

    useAsync(async () => {
      const query = await $content('data').only(['body']).where({ id: route.value.params.id })
      data.value = await query.fetch()
      item.value = data.value.body
    })

    console.log(item.value)
    console.log(route.value.params.id)

    const toDetail = (id: string) => {
      router.push(`/${id}`)
    }

    return {
      item,
      toDetail
    }
  }
})
</script>
