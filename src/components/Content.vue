<template>
  <v-content>
    <v-sheet
      id="scrolling-techniques"
      class="overflow-y-auto"
      max-height="100vh"
    >
      <v-container>
        <v-data-table
          :headers="headers"
          :items="desserts"
          :items-per-page="100"
          sort-by="quality"
          class="elevation-3"
          hide-default-footer
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Download</v-toolbar-title>
              <v-divider
                class="mx-4"
                inset
                vertical
              ></v-divider>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <v-select
                  v-model="extension"
                  :items="$store.state.tabs === 'Video' ? videoExtensions : audioExtensions"
                  hide-details
                  outlined
                  dense
                  color="#9146ff"
                  item-color="purple"
                  class="my-auto"
                  label="File extension"
                  prepend-icon="mdi-puzzle"
                ></v-select>
              </v-toolbar-items>
            </v-toolbar>
          </template>
          <template v-slot:item.action="{ item }">
            <v-icon v-if="item.progress === 0" @click="download(item)">
              mdi-download
            </v-icon>
            <v-progress-circular v-else :value="item.progress"></v-progress-circular>
          </template>
        </v-data-table>
      </v-container>
    </v-sheet>
  </v-content>
</template>

<script>
import ytdl from 'ytdl-core'
import fs from 'fs'

function refresh () {
  this.desserts = []
  this.extension = this.$store.state.tabs === 'Video' ? 'mp4' : 'mp3'
  let formats = ytdl.filterFormats(this.$store.state.formats, this.$store.state.tabs === 'Video' ? 'videoonly' : 'audioonly')
  for (const i of ytdl.filterFormats(this.$store.state.formats, 'audioandvideo')) {
    formats.push(i)
  }

  if (formats) {
    for (const i of formats) {
      this.desserts.push(
        {
          quality: this.$store.state.tabs === 'Video' ? i.qualityLabel : i.audioBitrate ? i.audioBitrate + ' kbps' : null,
          size: i.contentLength ? (i.contentLength / 1024 / 1024).toFixed(0) + ' MB' : '',
          progress: 0,
          itag: i.itag
        }
      )
    }
  }
}

export default {
  data: () => ({
    headers: [
      { text: 'Quality', value: 'quality' },
      { text: 'Size', value: 'size' },
      { text: 'Action', value: 'action', sortable: false }
    ],
    desserts: [],
    videoExtensions: [ 'mp4' ],
    audioExtensions: [ 'mp3' ],
    extension: 'mp4'
  }),

  watch: {
    '$store.state.formats': refresh,
    '$store.state.tabs': refresh
  },

  methods: {
    download (item) {
      ytdl(this.$store.state.url, { filter: format => format.itag === item.itag })
        .on('progress', (chunkLength, downloaded, total) => {
          item.progress = downloaded / total
        })
        .on('end', () => {
          item.progress = 0
        })
        .pipe(fs.createWriteStream(`${item.itag}.${this.extension}`))
    }
  }
}
</script>
