<template>
  <v-navigation-drawer
    v-model="$store.state.drawer"
    temporary
    app
  >
    <template v-slot:append>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-btn tile outlined color="#9146ff" href="https://github.com/momenthana" target="_blank">
              <v-icon left>mdi-heart</v-icon> GitHub
            </v-btn>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            Copyright 2020 MomentHana. All rights reserved.
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>
