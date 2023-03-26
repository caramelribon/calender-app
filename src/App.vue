<template>
  <div class="main">
    <Header />
    <RouterView />
  </div>
</template>

<script lang="ts" setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from '@/components/Header.vue'
</script>

<style>
.main {
  margin: 0 auto;
  max-width: 1000px;
}
</style>
