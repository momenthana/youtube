<template>
  <v-navigation-drawer
    v-model="$store.state.drawer"
    absolute
    temporary
  >
    <template v-slot:append>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <span>Copyright 2020 <a href="https://github.com/momenthana" target="_blank">MomentHana</a>. All rights reserved.</span>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>
