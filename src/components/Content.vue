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
          sort-by="calories"
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
            </v-toolbar>
          </template>
          <template v-slot:item.action="{ item }">
            <v-icon
              small
              @click="download(item)"
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
export default {
  data: () => ({
    headers: [
      { text: 'Quality', value: 'quality' },
      { text: 'Extension', value: 'extension' },
      { text: 'Size', value: 'size' },
      { text: 'Action', value: 'action', sortable: false }
    ],
    desserts: []
  }),

  created () {
    this.initialize()
  },

  methods: {
    initialize () {
      this.desserts = [
        {
          quality: 1,
          extension: 1,
          size: 1
        }
      ]
    },

    download (item) {
      const index = this.desserts.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
    }
  }
}
</script>
