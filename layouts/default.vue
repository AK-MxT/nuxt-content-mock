<template>
  <v-app>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-toolbar-title
        v-text="title"
      />
      <v-spacer />
      <v-switch
        v-model="theme"
        :prepend-icon="themeIcon"
      >
        <v-icon>mdi-menu</v-icon>
      </v-switch>
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
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { computed, defineComponent, ref, useContext, watch } from '@nuxtjs/composition-api'

export default defineComponent({
  setup () {
    const { $vuetify } = useContext()

    const theme = ref(false)

    const themeIcon = computed(() => {
      return theme.value ? 'mdi-weather-night' : 'mdi-weather-sunny'
    })

    watch(theme, () => {
      $vuetify.theme.dark = theme.value
    })

    return {
      theme,
      themeIcon
    }
  }
})
</script>
