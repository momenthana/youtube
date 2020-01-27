module.exports = {
  'transpileDependencies': [
    'vuetify'
  ],
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: 'io.github.momenthana.youtube',
        productName: 'Youtube',
        publish: 'github'
      }
    }
  }
}
