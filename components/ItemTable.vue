<template>
  <v-card>
    <v-card-title>
      書籍一覧
      <v-spacer />
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        dense
        label="検索"
        hide-details
        outlined
      />
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="items"
      :search="search"
    >
      <template
        #item.actions="{ item }"
      >
        <v-btn
          @click="toDetail"
        >
          詳細
        </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref, useAsync, useContext } from '@nuxtjs/composition-api'
import type { TableData } from '~/types/data'

export default defineComponent({
  setup () {
    const {
      $content
    } = useContext()

    const search = ref('')
    const headers = [
      {
        text: 'タイトル',
        value: 'title'
      },
      {
        text: '著者',
        value: 'author'
      },
      {
        text: '出版社',
        value: 'publisher'
      },
      {
        text: '価格',
        value: 'price'
      },
      {
        text: '購入日',
        value: 'purchaseDate'
      }
    ]

    const data = ref<any>([])
    const items = ref<TableData>()

    useAsync(async () => {
      const query = await $content('data').only(['body'])
      data.value = await query.fetch()
      items.value = data.value.body
    })

    const toDetail = () => {
      console.log('詳細画面へ')
    }

    return {
      headers,
      items,
      search,
      toDetail
    }
  }
})
</script>
