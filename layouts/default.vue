<template>
  <v-app>
    <v-app-bar
      app
      clipped-left
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
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
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
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
    const drawer = ref(false)

    const items = [
      {
        title: '書籍登録',
        to: '/register'
      }
    ]

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
      drawer,
      items,
      logout,
      theme,
      themeIcon,
      title
    }
  }
})
</script>
