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
      no-data-text="データが存在しません"
      no-results-text="一致するデータが存在しません"
      :search="search"
    >
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template #item.actions="{ item }">
        <v-btn
          color="primary"
          small
          @click="toDetail(item.id)"
        >
          詳細
        </v-btn>
      </template>

      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template #item.price="{ item }">
        {{ price(item.price) }} 円
      </template>
    </v-data-table>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref, useAsync, useContext, useRouter } from '@nuxtjs/composition-api'
import type { TableData } from '~/types/data'

export default defineComponent({
  setup () {
    const {
      $content
    } = useContext()
    const router = useRouter()

    const search = ref('')
    const headers = [
      {
        sortable: false,
        text: '',
        value: 'actions'
      },
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
    const items = ref<TableData[]>()

    useAsync(async () => {
      const query = await $content('data').only(['body'])
      data.value = await query.fetch()
      items.value = data.value.body
    })

    const price = (price: string): string => {
      const numPrice = Number(price)
      return numPrice.toLocaleString()
    }

    const toDetail = (id: string) => {
      router.push(`/${id}`)
    }

    return {
      headers,
      items,
      price,
      search,
      toDetail
    }
  }
})
</script>
