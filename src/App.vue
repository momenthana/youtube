<template>
  <v-app>
    <Bar/>
    <Nav/>
    <Content/>
  </v-app>
</template>

<script>
import Bar from '@/components/Bar'
import Nav from '@/components/Nav'
import Content from '@/components/Content'

export default {
  components: {
    Bar,
    Nav,
    Content
  },

  mounted () {
    const dark = window.matchMedia('(prefers-color-scheme: dark)')
    this.$vuetify.theme.dark = dark.matches
    dark.addEventListener('change', () => {
      this.$vuetify.theme.dark = dark.matches
    })
  }
}
</script>
