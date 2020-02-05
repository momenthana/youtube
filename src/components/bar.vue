<template>
    <v-app-bar
      app
      dark
      color="#9146ff"
      src=""
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
        ></v-img>
      </template>

      <v-toolbar-title>Youtube Downloader</v-toolbar-title>
    </v-app-bar>
</template>

<script>
export default {
  name: 'bar',

  data: () => ({
    //
  })
}
</script>
