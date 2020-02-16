module.exports = {
  'transpileDependencies': [
    'vuetify'
  ],
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: 'io.github.momenthana.youtube',
        productName: 'Youtube',
        publish: 'github',
        mac: {
          category: 'public.app-category.utilities',
          darkModeSupport: true
        }
      }
    },
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  }
}
