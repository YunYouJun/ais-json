import i18n from 'i18n'

i18n.configure({
  locales: ['en', 'cn'],
  defaultLocale: 'en',
  directory: __dirname + '/locales',
  register: global
})

export default i18n