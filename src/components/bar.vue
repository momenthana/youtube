<template>
  <v-app-bar
    absolute
    color="#9146ff"
    dark
    shrink-on-scroll
    prominent
    src=""
    fade-img-on-scroll
    scroll-target="#scrolling-techniques-3"
  >
    <template v-slot:img="{ props }">
      <v-img
        v-bind="props"
        gradient="to top, rgba(0,0,0,.5), rgba(0,0,0,.5)"
      ></v-img>
    </template>

    <v-app-bar-nav-icon></v-app-bar-nav-icon>

    <v-toolbar-title>Title</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-text-field
        solo-inverted
        clearable
        v-model="url"
        placeholder="URL"
        prepend-inner-icon="mdi-magnify"
        color="black"
      >
      </v-text-field>
    </v-toolbar-items>

    <template v-slot:extension>
      <v-tabs align-with-title>
        <v-tab>Single</v-tab>
      </v-tabs>
    </template>
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
