<template>
  <div class="main__contents">
    <button @click="createCalender">カレンダー作成</button>
    <button @click="setSchedule">予定の新規登録/編集</button>
    <button @click="getCalender">1つのカレンダーの取得</button>
    <button @click="getAllCalenders">すべてのカレンダーを取得</button>
    <button @click="deleteSchedule">1つの予定を削除</button>
  </div>
</template>

<script lang="ts">
import { useCalenderStore } from '@/stores/calender'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Calender',
  setup() {
    const calenderStore = useCalenderStore()
    // 新規カレンダーの作成/データ保存
    const createCalender = async () => {
      const newCalender = {
        openStatus: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        lastUpdateUser: '5555',
        createUser: '1111',
        name: 'calender',
        description: 'これはテストです',
        color: 1
      }
      await calenderStore.createCalender(newCalender)
    }

    // 予定の新規登録/編集登録
    const setSchedule = async () => {
      // カレンダー情報が乗っているところ
      // 4jUFzJIOSYMhbLc8iD0I
      // 8GPpkICYy1jqoQCHikQ2
      // Pfb10AGNbq8wdvZXbK84
      // mFVf1RUoza8mlbho7fyK
      const calenderId = 'mFVf1RUoza8mlbho7fyK'
      const saveSchedule = {
        title: 'テストカレンダー',
        start: new Date(),
        end: new Date(),
        all: false,
        createUser: 'test',
        description: 'これはテストです',
        color: 0
      }
      if (calenderId) {
        await calenderStore.saveSchedule(saveSchedule, calenderId)
      }
    }

    // 1つのカレンダーを取得
    const getCalender = async () => {
      const calenderId = '4jUFzJIOSYMhbLc8iD0I'
      await calenderStore.fetchCalender(calenderId)
      console.log(calenderStore.calender)
    }

    // すべてのカレンダーを取得
    const getAllCalenders = async () => {
      await calenderStore.fetchAllCalenders()
      console.log(calenderStore.calenders)
    }

    // スケジュールを削除
    const deleteSchedule = async () => {
      const calenderId = '8GPpkICYy1jqoQCHikQ2'
      const scheduleId = 'ZVEw1XMUlX9vrL4CTasW'
      await calenderStore.removeSchedule(calenderId, scheduleId)
    }

    return { createCalender, setSchedule, getCalender, getAllCalenders, deleteSchedule }
  }
})
</script>

<style scoped></style>
