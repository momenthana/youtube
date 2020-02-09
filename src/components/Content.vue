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
            </v-toolbar>
          </template>
          <template v-slot:item.action="{ item }">
            <v-icon
              small
              @click="download(item.itag)"
            >
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

export default {
  data: () => ({
    headers: [
      { text: 'Quality', value: 'quality' },
      { text: 'Extension', value: 'extension' },
      { text: 'Size', value: 'size' },
      { text: 'Audio', value: 'audio' },
      { text: 'Action', value: 'action', sortable: false }
    ],
    desserts: [],
    received: 0
  }),

  watch: {
    '$store.state.formats': function () {
      this.desserts = []
      let formats = this.$store.state.formats
      for (const key in formats) {
        if (formats.hasOwnProperty(key)) {
          const element = formats[key]
          console.log(element)
          this.desserts.push(
            {
              itag: element.itag,
              quality: element.qualityLabel,
              extension: element.container,
              size: element.contentLength,
              audio: element.audioBitrate
            }
          )
        }
      }
    }
  },

  methods: {
    download (itag) {
      console.log(itag)
      ytdl(this.$store.state.url, { filter: format => format.itag === itag })
        .on('data', (chunk) => {
          this.received += chunk.length
        })
        .on('end', () => {
          console.log(this.received)
        })
        .pipe(fs.createWriteStream(`${itag}.mp4`))
    }
  }
}
</script>
