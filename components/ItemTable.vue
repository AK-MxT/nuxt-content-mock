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
    <v-card-actions
      class="justify-end px-4"
    >
      <v-btn
        color="error"
        @click="reset"
      >
        データリセット
      </v-btn>
    </v-card-actions>
    <v-data-table
      :headers="headers"
      :items="items"
      no-data-text="データが存在しません"
      no-results-text="一致するデータが存在しません"
      :search="search"
    >
      <template #[`item.actions`]="{ item }">
        <v-btn
          color="primary"
          small
          @click="toDetail(item.id)"
        >
          詳細
        </v-btn>
      </template>

      <template #[`item.price`]="{ item }">
        {{ price(item.price) }} 円
      </template>
    </v-data-table>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref, useAsync, useContext, useRouter } from '@nuxtjs/composition-api'
import { useAccessor } from '~/hooks/useAccessor'
import type { TableData } from '~/types/data'

export default defineComponent({
  setup () {
    const accessor = useAccessor()
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
      if (accessor.itemList.length === 0) {
        const query = await $content('data').only(['body'])
        data.value = await query.fetch()
        items.value = data.value.body
        accessor.setItemList(data.value.body)
      } else {
        items.value = accessor.itemList
      }
    })

    const reset = async () => {
      const query = await $content('data').only(['body'])
      data.value = await query.fetch()
      items.value = data.value.body
      accessor.setItemList(data.value.body)
    }

    const price = (price: string): string => {
      const numPrice = Number(price)
      return numPrice.toLocaleString()
    }

    const toDetail = (id: string) => {
      const idx = accessor.itemList.findIndex(item => item.id === id)
      accessor.setSelectedItem(accessor.itemList[idx])
      router.push(`/${id}`)
    }

    return {
      headers,
      items,
      price,
      reset,
      search,
      toDetail
    }
  }
})
</script>
