<template>
  <v-row>
    <v-col>
      <v-card
        class="mx-auto pa-2"
        max-width="272"
      >
        <v-card-title
          class="justify-center"
        >
          ログイン
        </v-card-title>
        <v-card-actions
          class="justify-center"
        >
          <label>
            ユーザ名
            <v-text-field
              v-model="userName"
              hide-details="auto"
              solo
              style="width: 219px;"
            />
          </label>
        </v-card-actions>
        <v-card-actions
          class="justify-center"
        >
          <label>
            パスワード
            <v-text-field
              v-model="password"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              hide-details="auto"
              solo
              type="password"
              @click:append="show = !show"
            />
          </label>
        </v-card-actions>
        <v-card-actions
          class="justify-center"
        >
          <v-btn
            color="primary"
            @click="login"
          >
            ログイン
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent, ref, useContext, useAsync } from '@nuxtjs/composition-api'

export default defineComponent({
  setup () {
    const {
      $content
    } = useContext()

    const userName = ref('')
    const password = ref('')
    const show = ref(false)

    const accounts = ref<any>([])

    useAsync(async () => {
      const query = await $content('account')
      accounts.value = await query.fetch()
    })

    const login = () => {
      console.log('accounts', accounts.value.body)
    }

    return {
      login,
      userName,
      password,
      show
    }
  }
})
</script>
