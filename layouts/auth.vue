<template>
  <v-app>
    <v-app-bar
      app
    >
      <v-toolbar-title
        v-text="title"
      />
      <v-spacer />
      <v-btn
        icon
        @click="theme = !theme"
      >
        <v-icon>
          {{ themeIcon }}
        </v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { computed, defineComponent, ref, useContext, watch } from '@nuxtjs/composition-api'

export default defineComponent({
  setup () {
    const { $vuetify } = useContext()

    const title = 'Mock-App'
    const theme = ref($vuetify.theme.dark)

    const themeIcon = computed(() => {
      return theme.value ? 'mdi-weather-night' : 'mdi-weather-sunny'
    })

    watch(theme, () => {
      $vuetify.theme.dark = theme.value
    })

    return {
      theme,
      themeIcon,
      title
    }
  }
})
</script>
