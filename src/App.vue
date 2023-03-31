<script setup>
import layout from './components/layouts/layout.vue';
</script>

<template>
  <main class="dark:from-slate-900 bg-gray-100">
    <layout/>
    <RouterView/>
  </main>
</template>
<!-- 
<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
 -->