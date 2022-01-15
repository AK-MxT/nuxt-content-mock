<template>
  <v-card
    class="px-4"
  >
    <v-card-title
      class="px-0"
    >
      {{ title }}
    </v-card-title>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      @submit.prevent
    >
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <base-form-text-field
            v-model="selectedItem.title"
            :can-edit="canEdit"
            label="タイトル"
            :rules="[rules.required]"
          />
          <base-form-text-field
            v-model="selectedItem.author"
            :can-edit="canEdit"
            label="著者"
            :rules="[rules.required]"
          />
          <base-form-text-field
            v-model="selectedItem.supervision"
            :can-edit="canEdit"
            label="監修"
          />
          <base-form-text-field
            v-model="selectedItem.publisher"
            :can-edit="canEdit"
            label="出版社"
            :rules="[rules.required]"
          />
          <base-form-text-field
            v-model="selectedItem.price"
            :can-edit="canEdit"
            suffix="円"
            label="価格"
            :rules="[rules.required, rules.number]"
          />
          <base-form-text-field
            v-model="selectedItem.genre"
            :can-edit="canEdit"
            label="ジャンル"
            :rules="[rules.required]"
          />
          <base-form-textarea
            v-model="selectedItem.description"
            :can-edit="canEdit"
            label="説明"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
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
                dense
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
                dense
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
          <base-form-textarea
            v-model="selectedItem.remarks"
            :can-edit="canEdit"
            label="備考"
          />
          <base-form-text-field
            v-if="!registerMode"
            v-model="selectedItem.createDate"
            disabled
            label="作成日"
          />
          <base-form-text-field
            v-if="!registerMode"
            v-model="selectedItem.updateDate"
            disabled
            label="更新日"
          />
          <v-btn
            v-if="!registerMode && !canEdit"
            class="mb-4 mr-2"
            color="primary"
            @click="canEdit = true"
          >
            編集する
          </v-btn>
          <template
            v-if="!registerMode && canEdit"
          >
            <v-btn
              class="mb-4 mr-2"
              color="accent"
              @click="cancel"
            >
              キャンセル
            </v-btn>
            <v-btn
              class="mb-4 mr-2"
              color="info"
              :disabled="!valid"
              @click="save"
            >
              更新
            </v-btn>
          </template>
          <template
            v-if="registerMode"
          >
            <v-btn
              class="mb-4 mr-2"
              color="info"
              :disabled="!valid"
              @click="save"
            >
              登録
            </v-btn>
          </template>
          <v-btn
            class="mb-4"
            color="secondary"
            @click="toList"
          >
            一覧画面へ戻る
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, useRouter } from '@nuxtjs/composition-api'
import { useAccessor } from '~/hooks/useAccessor'
import type { TableData } from '~/types/data'
import { required, number } from '~/lib/validation'
import { VForm } from '~/types/vuetify'

export default defineComponent({
  props: {
    registerMode: Boolean
  },

  setup (props) {
    const accessor = useAccessor()
    const router = useRouter()

    const rules = {
      number,
      required
    }

    const form = ref<VForm | null>(null)
    const valid = ref(true)

    // 登録時は初めから編集モードにする
    const canEdit = ref(props.registerMode)

    const releaseDateMenu = ref(false)
    const purchaseDateMenu = ref(false)

    const title = props.registerMode ? '書籍登録' : '書籍詳細情報'

    const selectedItem = reactive<TableData>({
      id: props.registerMode ? '' : accessor.selectedItem.id,
      title: props.registerMode ? '' : accessor.selectedItem.title,
      author: props.registerMode ? '' : accessor.selectedItem.author,
      supervision: props.registerMode ? '' : accessor.selectedItem.supervision,
      publisher: props.registerMode ? '' : accessor.selectedItem.publisher,
      price: props.registerMode ? '' : accessor.selectedItem.price,
      genre: props.registerMode ? '' : accessor.selectedItem.genre,
      description: props.registerMode ? '' : accessor.selectedItem.description,
      releaseDate: props.registerMode ? '' : accessor.selectedItem.releaseDate,
      purchaseDate: props.registerMode ? '' : accessor.selectedItem.purchaseDate,
      remarks: props.registerMode ? '' : accessor.selectedItem.remarks,
      createDate: props.registerMode ? '' : accessor.selectedItem.createDate,
      updateDate: props.registerMode ? '' : accessor.selectedItem.updateDate
    })

    const save = () => {
      // 保存処理
      if (form.value?.validate()) {
        // 更新日にシステム日付をセット
        selectedItem.updateDate = new Date().toISOString().split('T')[0]

        if (props.registerMode) {
          //  登録の場合
          // 登録日にシステム日付をセット
          selectedItem.createDate = new Date().toISOString().split('T')[0]

          accessor.register(selectedItem)
        } else {
          // 更新の場合
          accessor.update(selectedItem)
        }

        router.push('/')

        // 選択したデータのstateをクリア
        accessor.setSelectedItem({} as TableData)
      }
    }

    const cancel = () => {
      // キャンセル時は元の値に戻す
      Object.assign(selectedItem, {
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

      canEdit.value = false
    }

    const toList = () => {
      accessor.clearSnackbar()
      router.push('/')

      // 選択したデータのstateをクリア
      accessor.setSelectedItem({} as TableData)
    }

    return {
      cancel,
      canEdit,
      form,
      purchaseDateMenu,
      releaseDateMenu,
      rules,
      save,
      selectedItem,
      title,
      toList,
      valid
    }
  }
})
</script>
