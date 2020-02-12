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
            <v-icon @click="download(item.itag)">
              mdi-download
            </v-icon>
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
  const formats = this.$store.state.formats
  this.desserts = []
  this.extension = this.$store.state.tabs === 'Video' ? 'mp4' : 'mp3'
  if (formats) {
    for (const i of formats) {
      this.desserts.push(
        {
          quality: this.$store.state.tabs === 'Video' ? i.qualityLabel : i.audioBitrate ? i.audioBitrate + ' kbps' : null,
          size: i.contentLength ? (i.contentLength / 1024 / 1024).toFixed(0) + ' MB' : '',
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
    extension: 'mp4',
    received: 0
  }),

  watch: {
    '$store.state.formats': refresh,
    '$store.state.tabs': refresh
  },

  methods: {
    download (itag) {
      ytdl(this.$store.state.url, { filter: format => format.itag === itag })
        .on('data', (chunk) => {
          this.received += chunk.length
        })
        .on('end', () => {
          console.log(this.received)
        })
        .pipe(fs.createWriteStream(`${itag}.${this.extension}`))
    }
  }
}
</script>
