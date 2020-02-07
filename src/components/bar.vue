<template>
  <v-app-bar
    app
    color="#9146ff"
    dark
    shrink-on-scroll
    prominent
    :src="img"
    fade-img-on-scroll
    scroll-target="#scrolling-techniques"
  >
    <template v-slot:img="{ props }">
      <v-img
        v-bind="props"
        gradient="to top, rgba(0,0,0,.5), rgba(0,0,0,.5)"
      ></v-img>
    </template>

    <v-app-bar-nav-icon></v-app-bar-nav-icon>

    <v-toolbar-title>{{ title }}</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-text-field
        solo-inverted
        clearable
        v-model="url"
        placeholder="URL"
        prepend-inner-icon="mdi-magnify"
        color="#9146ff"
        @input="update"
      >
      </v-text-field>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
import ytdl from 'ytdl-core'

export default {
  data: () => ({
    url: '',
    title: 'Youtube Downloader',
    img: ''
  }),

  methods: {
    update () {
      if (this.url) {
        if (ytdl.validateURL(this.url)) {
          ytdl.getInfo(ytdl.getURLVideoID(this.url), { lang: 'kr' }, (err, info) => {
            if (err) throw err
            console.log(info)
            this.title = info.title
            this.img = 'https://i.ytimg.com/vi/' + info.video_id + '/maxresdefault.jpg'
            this.$store.state.formats = info.formats
          })
        } else {
          this.title = 'Youtube Downloader'
          this.img = ''
          this.$store.state.formats = ''
        }
      } else {
        this.title = 'Youtube Downloader'
        this.img = ''
        this.$store.state.formats = ''
      }
    }
  }
}
</script>
