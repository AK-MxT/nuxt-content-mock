<template>
  <v-app>
    <v-app-bar
      fixed
      app
    >
      <v-toolbar-title
        v-text="title"
      />
      <v-spacer />
      <v-btn
        class="mr-4"
        icon
        @click="theme = !theme"
      >
        <v-icon>
          {{ themeIcon }}
        </v-icon>
      </v-btn>
      <v-btn
        color="error"
        small
        @click="logout"
      >
        ログアウト
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer
      absolute
      app
    >
      <span>&copy; {{ new Date().getFullYear() + ' - ' + author }}</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { computed, defineComponent, ref, useContext, useRouter, watch } from '@nuxtjs/composition-api'
import { useAccessor } from '~/hooks/useAccessor'

export default defineComponent({
  setup () {
    const { $vuetify } = useContext()
    const accessor = useAccessor()
    const router = useRouter()

    const title = 'Mock-App'
    const author = 'AK-MxT'
    const theme = ref($vuetify.theme.dark)

    const themeIcon = computed(() => {
      return theme.value ? 'mdi-weather-night' : 'mdi-weather-sunny'
    })

    const logout = () => {
      accessor.setAuthentication({
        isLogin: false,
        userName: ''
      })

      router.push('/auth')
    }

    watch(theme, () => {
      $vuetify.theme.dark = theme.value
    })

    return {
      author,
      logout,
      theme,
      themeIcon,
      title
    }
  }
})
</script>
