<template>
  <v-app>
    <bar/>
    <home/>
  </v-app>
</template>

<script>
import bar from '@/components/bar'
import home from '@/components/home'

export default {
  name: 'App',

  components: {
    bar,
    home
  },

  data: () => ({
    //
  }),

  mounted () {
    const dark = window.matchMedia('(prefers-color-scheme: dark)')
    this.$vuetify.theme.dark = dark.matches
    dark.addEventListener('change', () => {
      this.$vuetify.theme.dark = dark.matches
    })
  }
}
</script>
