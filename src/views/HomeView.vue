<template>
  <div class="main__contents">
    <div class="about">
      <p class="message">What's App Name?</p>
      <p class="fw1 fs24 mt18 ml30">
        App Nameはカレンダーをシェアしたり、<br />
        みんなでカレンダーを作る上げたりするアプリです！
      </p>
    </div>
    <div class="mt50">
      <p class="en">Calender</p>
      <p class="jp fw1 mt04">カレンダーの一覧</p>
      <DefaultButton class="fw1 calender-btn" color="#BADF73"> カレンダーを作成する</DefaultButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent } from 'vue'
import DefaultButton from '@/components/button/DefaultButton.vue'
</script>

<style scoped>
.message {
  font-size: 64px;
  line-height: 100%;
  color: var(--white);
  font-weight: 900;
  -webkit-text-stroke: 1px #000000;
}
.en {
  color: var(--orange);
}
.calender-btn {
  width: 314px;
  margin: 50px auto 0 auto;
}
</style>
