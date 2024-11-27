<!-- 
  
App.vue : Root 컴포넌트
  - 모든 하위 컴포넌트를 포함하는 컨테이너 역할을 함

-->

<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/pepe.jpg">  <!-- 모든 페이지에 보여주는 귀여운 개구리 페페 -->
    <router-view /> <!-- 현재 라우터에 의해 매칭된 컴포넌트를 렌더링하는 자리 표시자로, URL이 바뀔 때마다 해당 URL에 맞는 컴포넌트를 동적으로 입력함 -->
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
    // 공통 레이아웃 요소나 모든 페이지에서 사용되는 글로벌 컴포넌트(알림, 스피너 등)들 입력
    // header,
    // footer,
    // Home,
    // About, 등 추가 가능
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
