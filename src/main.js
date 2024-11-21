import Vue from 'vue'
import App from './App.vue'
import router from './router';  // router 모듈 추가

import '@/assets/css/custom.css'

Vue.config.productionTip = false

new Vue({
  router,   // router 추가
  render: h => h(App),
}).$mount('#app')
