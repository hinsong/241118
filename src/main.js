import Vue from 'vue'
import App from './App.vue'
import router from './router';  // Vue Router 설정 불러오기

import '@/assets/css/custom.css'  // CSS 불러오기

Vue.config.productionTip = false

new Vue({
  router,   // 애플리케이션에서 라우팅을 관리하는 Vue Router 연결
  render: h => h(App),  // App 컴포넌트 렌더링, 화면에 표시함
}).$mount('#app')   // index.html에서 id가 'app'인 요소에 마운트
