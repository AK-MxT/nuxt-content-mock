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
        :readonly="!canEdit"
      />
      <v-text-field
        v-model="selectedItem.author"
        label="著者"
        outlined
        :readonly="!canEdit"
      />
      <v-text-field
        v-model="selectedItem.supervision"
        label="監修"
        outlined
        :readonly="!canEdit"
      />
      <v-text-field
        v-model="selectedItem.publisher"
        label="出版社"
        outlined
        :readonly="!canEdit"
      />
      <v-text-field
        v-model="selectedItem.price"
        suffix="円"
        label="価格"
        outlined
        :rules="[rules.required, rules.number]"
        :readonly="!canEdit"
      />
      <v-text-field
        v-model="selectedItem.genre"
        label="ジャンル"
        outlined
        :readonly="!canEdit"
      />
      <v-textarea
        v-model="selectedItem.description"
        label="説明"
        outlined
        :readonly="!canEdit"
      />
      <v-menu
        v-model="releaseDateMenu"
        :close-on-content-click="false"
        :disabled="!canEdit"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template #activator="{ on, attrs }">
          <v-text-field
            v-model="selectedItem.releaseDate"
            label="発売日"
            outlined
            prepend-inner-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          />
        </template>
        <v-date-picker
          v-model="selectedItem.releaseDate"
          :readonly="!canEdit"
          @input="menu = false"
        />
      </v-menu>
      <v-menu
        v-model="purchaseDateMenu"
        :close-on-content-click="false"
        :disabled="!canEdit"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template #activator="{ on, attrs }">
          <v-text-field
            v-model="selectedItem.purchaseDate"
            label="購入日"
            outlined
            prepend-inner-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          />
        </template>
        <v-date-picker
          v-model="selectedItem.purchaseDate"
          :readonly="!canEdit"
          @input="menu = false"
        />
      </v-menu>
      <v-textarea
        v-model="selectedItem.remarks"
        label="備考"
        outlined
        :readonly="!canEdit"
      />
      <v-text-field
        v-model="selectedItem.createDate"
        disabled
        label="作成日"
        outlined
      />
      <v-text-field
        v-model="selectedItem.updateDate"
        disabled
        label="更新日"
        outlined
      />
      <v-btn
        class="mb-4"
        color="primary"
        @click="canEdit = true"
      >
        編集する
      </v-btn>
      <v-btn
        class="mb-4"
        color="secondary"
        @click="toList"
      >
        一覧画面へ戻る
      </v-btn>
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

    const canEdit = ref(false)
    const releaseDateMenu = ref(false)
    const purchaseDateMenu = ref(false)

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

    const toList = () => {
      router.push('/')
    }

    return {
      canEdit,
      purchaseDateMenu,
      releaseDateMenu,
      rules,
      save,
      selectedItem,
      toList
    }
  }
})
</script>
