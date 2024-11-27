import Vue from 'vue' // Vue 라이브러리 불러오기
import App from './App.vue' // 최상위 컴포넌트인 App 컴포넌트 불러오기
import router from './router';  // Vue Router 설정 불러오기

import '@/assets/css/custom.css'  // CSS 불러오기

Vue.config.productionTip = false  // 프로덕션 환경에서 Vue 관련 콘솔 경고를 표시하지 않도록 설정

new Vue({
  router,    // 라우팅 기능을 Vue 인스턴스에 연결 (애플리케이션의 URL을 관리하고 각 경로에 대해 특정 컴포넌트를 렌더링하는 역할)
  render: h => h(App),  // 최상위 App 컴포넌트를 렌더링하여 화면에 표시 (Vue 인스턴스가 초기화될 때 렌더링하는 컴포넌트)
}).$mount('#app')   // index.html에서 id가 'app'인 요소에 Vue 인스턴스를 마운트 (Vue 애플리케이션이 시작되는 HTML 엘리먼트)
