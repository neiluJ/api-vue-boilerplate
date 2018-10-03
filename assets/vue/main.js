// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueI18n from 'vue-i18n'
import moment from 'moment'
import messagesFR from '../translations/messages.fr.json'

Vue.config.productionTip = false;

Vue.use(VueI18n);

// Configuration de l'internationalisation
let locale = require('browser-locale')();
if (!locale) {
  locale = 'fr'; // define with symfony ?!
}

const i18n = new VueI18n({
  locale: locale,
  fallbackLocale: 'fr',
  messages: {
    fr: messagesFR
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
