<template>
  <v-row>
    <v-col>
      <v-card
        class="mx-auto pa-2"
        max-width="320"
      >
        <!-- TODO: 閉じると再表示されない -->
        <base-alert
          v-model="alert"
          dismissible
          message="ユーザ名またはパスワードが異なります"
          @close="alert = false"
        />
        <v-card-title
          class="justify-center"
        >
          ログイン
        </v-card-title>
        <v-card-subtitle
          class="text-center"
        >
          hoge / test1234 でログイン可能です。
        </v-card-subtitle>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          @submit.prevent
        >
          <v-card-actions
            class="justify-center"
          >
            <label>
              ユーザ名
              <v-text-field
                v-model="userName"
                dense
                hide-details="auto"
                :rules="[rules.required]"
                outlined
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
                dense
                hide-details="auto"
                :rules="[rules.required]"
                outlined
                :type="show ? 'text' : 'password'"
                @click:append="show = !show"
              />
            </label>
          </v-card-actions>
          <v-card-actions
            class="justify-center"
          >
            <v-btn
              color="primary"
              :disabled="!valid"
              @click="login"
            >
              ログイン
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent, ref, useContext, useAsync, useRouter } from '@nuxtjs/composition-api'
import { useAccessor } from '~/hooks/useAccessor'
import { required } from '~/lib/validation'
import { VForm } from '~/types/vuetify'
import type { Account } from '~/types/data'

export default defineComponent({
  setup () {
    const {
      $content
    } = useContext()

    const accessor = useAccessor()
    const router = useRouter()

    const rules = {
      required
    }

    const alert = ref(false)

    const form = ref<VForm | null>(null)
    const valid = ref(true)

    const userName = ref('')
    const password = ref('')
    const show = ref(false)

    const res = ref<any>([])
    const accounts = ref<Account[]>()

    useAsync(async () => {
      const query = await $content('account')
      res.value = await query.fetch()

      accounts.value = res.value.body
    })

    const login = () => {
      if (form.value?.validate()) {
        if (accounts.value?.some(account => account.password === password.value && account.userName === userName.value)) {
          accessor.setAuthentication({
            isLogin: true,
            userName: userName.value
          })

          router.push('/')
        } else {
          alert.value = true
        }
      }
    }

    return {
      alert,
      form,
      login,
      userName,
      password,
      rules,
      show,
      valid
    }
  }
})
</script>
