// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueI18n from 'vue-i18n'
import moment from 'moment'
import messagesEN from '../translations/messages.en.json'

Vue.use(VueI18n);

Vue.config.productionTip = false;

// use the locale defined in <html lang="xy"> (as it depends on Symfony
let locale = document.documentElement.lang;
if (!locale) {
  locale = 'en';
}

const i18n = new VueI18n({
  locale: locale,
  fallbackLocale: 'en',
  messages: {
    en: messagesEN
  }
});


moment.locale(locale);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
});
