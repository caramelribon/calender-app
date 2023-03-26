<template>
  <div class="top">
    <Header />
    <div class="main__contents">
      <div class="about">
        <p class="message">What's Calenshare?</p>
        <p class="fw1 fs24 mt18 ml30">
          Calenshareはカレンダーをシェアしたり、<br />
          みんなでカレンダーを作る上げたりするアプリです！
        </p>
      </div>
      <div class="mt50">
        <p class="en">Calendar</p>
        <p class="jp fw1 mt04">カレンダーの一覧</p>
        <div class="calenders mt30">
          <DefaultCalenderCard
            :calender-data="calender"
            @click="() => handleCalenderClick(calender.calenderId)"
            v-for="calender in calenderStore.calenders"
            :key="calender.calenderId"
          />
        </div>
        <DefaultButton
          class="fw1 calender-btn"
          color="#BADF73"
          @click="handleCreateCarendarButtonClick"
        >
          カレンダーを作成する</DefaultButton
        >
      </div>
      <CreateCalenderDialiog
        :isOpen="isCreateCalendarDialogOpen"
        @close="() => (isCreateCalendarDialogOpen = false)"
        @save="createCalender"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, onMounted, ref } from 'vue'
import Header from '@/components/Header.vue'
import DefaultButton from '@/components/button/DefaultButton.vue'
import DefaultCalenderCard from '@/components/DefaultCalenderCard.vue'
import CreateCalenderDialiog from '@/components/CreateCalenderDialog.vue'
import { useCalenderStore } from '@/stores/calender'
import { useRouter } from 'vue-router'
import type { Calendar } from '@/values/Calendar'
import { useUserStore } from '@/stores/user'
const router = useRouter()
const calenderStore = useCalenderStore()
const userStore = useUserStore()
onMounted(() => {
  calenderStore.fetchAllCalenders()
})
const handleCalenderClick = (calenderId: string) => {
  router.push('/calendar/' + calenderId)
}

const isCreateCalendarDialogOpen = ref(false)

const handleCreateCarendarButtonClick = () => {
  isCreateCalendarDialogOpen.value = true
}

const createCalender = async (
  calendar: Omit<Calendar, 'calenderId' | 'createUser' | 'lastUpdateUser'>
) => {
  let userId = userStore.user?.userId
  if (!userId) userId = ''
  const newCal: Omit<Calendar, 'calenderId'> = {
    createUser: userId,
    lastUpdateUser: userId,
    ...calendar
  }
  await calenderStore.createCalender(newCal)
  calenderStore.fetchAllCalenders()
}
</script>

<style scoped>
.top {
   background-color: #d8eeff;
}
.main__contents {
  padding: 50px 50px;
}
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
.calenders {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
  flex-wrap: wrap;
}
.calender-btn {
  width: 314px;
  margin: 50px auto 0 auto;
}
</style>
