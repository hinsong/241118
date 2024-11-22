<!-- 
  
App.vue : Root 컴포넌트
  - 모든 하위 컴포넌트를 포함하는 컨테이너 역할을 함

-->

<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
    
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
