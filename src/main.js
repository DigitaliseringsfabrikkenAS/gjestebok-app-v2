import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import axios from 'axios'

// VUE-ROUTER - https://router.vuejs.org/
import router from './router'

// VUEX - https://vuex.vuejs.org/
import store from './store'

import Lang from 'vuejs-localization'

Lang.requireAll(require.context('./lang', true, /\.js$/))

Vue.config.productionTip = false

Vue.use(Lang)

const notProtectedRoute = () => {
  return !['ForgotPassword', 'Login', 'ResetPassword'].includes(router.currentRoute.name)
}

const logoutFunct = () => {
  localStorage.removeItem('userData')
  getLogout()
    .then(() => {
      if (notProtectedRoute()) router.push({
        name: 'Login',
        params: {lang: localStorage.selectedLanguage || 'no'}
      })
    })
    .catch((err) => {
      console.log(err)
      if (notProtectedRoute()) router.push({
        name: 'Login',
        params: {lang: localStorage.selectedLanguage || 'no'}
      })
    })
}

axios.interceptors.request.use((config) => {

  if (localStorage.selectedLanguage === undefined) {
    localStorage.selectedLanguage = 'no';
  }

  config.headers.common['X-localization'] = localStorage.selectedLanguage;

  return config;
});

axios.interceptors.response.use(
  (response) => {
    if (response?.status === 401) logoutFunct()

    if (response?.status === 403) {
      if (notProtectedRoute()) router.push({
        name: 'Home',
        params: {lang: localStorage.selectedLanguage || 'no'}
      })
    }

    return response
  },
  (error) => {
    console.log(error?.response)
    if (error?.response?.status === 401) logoutFunct()

    if (error?.response?.status === 403) {
      if (notProtectedRoute()) router.push({
        name: 'Home',
        params: {lang: localStorage.selectedLanguage || 'no'}
      })
    }

    return error
  })

export const bus = new Vue()

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
