<template>
  <div class="main">
    <RouterView />
  </div>
</template>

<script lang="ts" setup>
import { RouterView } from 'vue-router'

</script>

<style>
.main {
  margin: 0 auto;
  max-width: 1000px;
}
</style>
