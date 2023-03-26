<template>
  <div class="calender-card__wrapper">
    <div class="calender-card">
      <div class="card-top" :style="`background-color: ${bgColor}`">
        <div class="card-top__contents">
          <div class="card-title">
            <span class="circle"></span>
            <p class="fs32 lh100 fw1">{{ calenderData.name }}</p>
          </div>
          <img src="/src/assets/calender_month_icon.svg" class="calender-icon" alt="" />
        </div>
      </div>
      <div class="card-bottom">
        <p class="fs24 fw1">{{ calenderData.description }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getColorData } from '@/utils/color'
import { ref, defineProps, computed } from 'vue'
const props = defineProps({
  calenderData: {
    type: Object,
    required: true
  }
})
const calenderData = ref(props.calenderData)
const bgColor = computed(() => {
  return getColorData(calenderData.value.color);
})
</script>

<style scoped>
.calender-card {
  width: 390px;
  height: 250px;
}
.card-top {
  height: 80px;
  padding: 22px 24px;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  border: 1px solid var(--black);
}
.card-top__contents {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.card-title {
  display: flex;
  gap: 10px;
  align-items: center;
}
span {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid var(--black);
  background-color: var(--white);
}
.card-bottom {
  background-color: white;
  height: 170px;
  padding: 24px 50px;
  border: 1px solid var(--black);
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  border-top: none;
}
</style>
