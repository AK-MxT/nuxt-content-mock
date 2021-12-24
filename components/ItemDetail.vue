<template>
  <v-card
    class="px-4"
  >
    <v-card-title>
      書籍詳細情報
    </v-card-title>
    <v-form
      ref="form"
    >
      <v-text-field
        v-model="selectedItem.title"
        label="タイトル"
        outlined
        :readonly="canEdit"
      />
      <v-text-field
        v-model="selectedItem.author"
        label="著者"
        outlined
        :readonly="canEdit"
      />
      <v-text-field
        v-model="selectedItem.supervision"
        label="監修"
        outlined
        :readonly="canEdit"
      />
      <v-text-field
        v-model="selectedItem.publisher"
        label="出版社"
        outlined
        :readonly="canEdit"
      />
      <v-text-field
        v-model="selectedItem.price"
        suffix="円"
        label="価格"
        outlined
        :rules="[rules.required, rules.number]"
        :readonly="canEdit"
      />
      <v-text-field
        v-model="selectedItem.genre"
        label="ジャンル"
        outlined
        :readonly="canEdit"
      />
    </v-form>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, useRouter } from '@nuxtjs/composition-api'
import { useAccessor } from '~/hooks/useAccessor'
import type { TableData } from '~/types/data'
import { required, number } from '~/lib/validation'

export default defineComponent({
  setup () {
    const accessor = useAccessor()
    const router = useRouter()

    const rules = {
      number,
      required
    }

    const canEdit = ref(true)

    const selectedItem = reactive<TableData>({
      id: accessor.selectedItem.id,
      title: accessor.selectedItem.title,
      author: accessor.selectedItem.author,
      supervision: accessor.selectedItem.supervision,
      publisher: accessor.selectedItem.publisher,
      price: accessor.selectedItem.price,
      genre: accessor.selectedItem.genre,
      description: accessor.selectedItem.description,
      releaseDate: accessor.selectedItem.releaseDate,
      purchaseDate: accessor.selectedItem.purchaseDate,
      remarks: accessor.selectedItem.remarks,
      createDate: accessor.selectedItem.createDate,
      updateDate: accessor.selectedItem.updateDate
    })

    const save = () => {
      router.push('/')
    }

    return {
      canEdit,
      rules,
      save,
      selectedItem
    }
  }
})
</script>
