<template>
  <div class="main__contents">
    <template v-if="calenderStore.calender">
      <div>{{ calenderStore.calender.name }}</div>
      <div>最終編集時刻 {{ lastUpdatedAtStr }}</div>
      <p style="word-wrap: break-word">{{ calenderStore.calender.description }}</p>
      <button @click="addEvent">addEvent</button>
      <FullCalender :options="calenderOptions">
        <template v-slot:dayHeaderContent="arg">
          <span class="fc-custom-header">{{ arg.text }}</span>
        </template>
        <template v-slot:dayCellContent="arg">
          <span class="fc-custom-daygrid-day-number">{{ arg.dayNumberText }}</span>
        </template>
        <template v-slot:eventContent="arg">
          <span class="fc-custom-event">
            <i>{{ arg.event.title }}</i></span
          >
        </template>
      </FullCalender>
    </template>
  </div>
</template>
  
<script lang="ts" setup>
import FullCalender from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import type { CalendarOptions, EventClickArg } from '@fullcalendar/core'
import { scheduleToFcEvent } from '@/utils/events'
import { mapStores } from 'pinia'
import { useCalenderStore } from '@/stores/calender'
import { useRoute, useRouter } from 'vue-router'
import { computed, onBeforeMount, onMounted } from 'vue'

const route = useRoute()
const router = useRouter()

const calenderId = route.params.calenderId as string
const defaultCalenderOptions = {
  headerToolbar: {
    start: 'prev,next today',
    center: 'title',
    end: 'dayGridMonth,dayGridWeek'
  },
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  views: {
    dayGridMonth: {
      dayMaxEvents: 3
    },

    dayGridWeek: {
      dayMaxEvents: 20
    }
  },
  selectable: true,
  weekends: true
}

const calenderStore = useCalenderStore()

onMounted(async() => {
  const fetchData = await calenderStore.fetchCalender(calenderId)
  if(!fetchData){
    router.push('/')
  }
})

const events = computed(()=>{
  return calenderStore.calender? calenderStore.calender.schedules.map(scheduleToFcEvent):[]
})

const calenderOptions = computed((): CalendarOptions => {
  return {
    events: events.value,
    eventClick: handleEventClick,
    ...defaultCalenderOptions
  }
})

const lastUpdatedAtStr = computed(() => {
  if (!calenderStore.calender) return ''
  const d = new Date(calenderStore.calender.updatdAt)
  return `${d.getFullYear()} / ${(d.getMonth() + 1).toString().padStart(2, '0')} / ${d
    .getDate()
    .toString()
    .padStart(2, '0')} ${d.getHours().toString().padStart(2, '0')}:${d
    .getMinutes()
    .toString()
    .padStart(2, '0')}`
})

const handleEventClick = (info: EventClickArg) => {
  info.jsEvent.preventDefault()
  const event = getScheduleFromId(info.event.id)
  if (!event) return
  event.color = 2
}
const getScheduleFromId = (id: string) => {
  return calenderStore.calender?.schedules.find((e) => e.scheduleId === id)
}
const addEvent = () => {}
</script>
  
<style scoped>
.fc-custom-header {
  font-size: small;
}

.fc-custom-daygrid-day-number {
  font-size: small;
  vertical-align: top;
}

.fc-custom-event {
  font-size: small;
}
</style>
  