<template>
  <div class="main__contents">
    <template v-if="calenderStore.calender">
      <div>{{ calenderStore.calender.name }}</div>
      <div>最終編集時刻 {{ lastUpdatedAtStr }}</div>
      <p style="word-wrap: break-word">{{ calenderStore.calender.description }}</p>
      <button @click="handleCreateScheduleButtonClick">addEvent</button>
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
      <CreateScheduleDialog
        :isOpen="isCreateScheduleDialogOpen"
        @close="() => (isCreateScheduleDialogOpen = false)"
        @save="createSchedule"
      />
      <EditScheduleDialog
        v-if="selectSchedule"
        :isOpen="isEditScheduleDialogOpen"
        @close="() => (isEditScheduleDialogOpen = false)"
        :schedule="selectSchedule"
        @save="editSchedule"
        @delete="deleteSchedule"
      />
    </template>
  </div>
</template>
  
<script lang="ts" setup>
import FullCalender from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import type { CalendarOptions, EventClickArg } from '@fullcalendar/core'
import { scheduleToFcEvent } from '@/utils/events'
import { useCalenderStore } from '@/stores/calender'
import { useRoute, useRouter } from 'vue-router'
import { computed, onMounted, ref, watch } from 'vue'
import CreateScheduleDialog from '@/components/CreateScheduleDialog.vue'
import EditScheduleDialog from '@/components/EditScheduleDialog.vue'
import type { Schedule } from '@/values/Schedule'

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

onMounted(async () => {
  const fetchData = await calenderStore.fetchCalender(calenderId)
  if (!fetchData) {
    router.push('/')
  }
})

const events = computed(() => {
  return calenderStore.calender ? calenderStore.calender.schedules.map(scheduleToFcEvent) : []
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

const isCreateScheduleDialogOpen = ref(false)
const isEditScheduleDialogOpen = ref(false)

const selectSchedule = ref<Schedule | null>(null)

watch(isEditScheduleDialogOpen, (val) => {
  if (!val) {
    selectSchedule.value = null
  }
})

const createSchedule = async (newSchedule: Omit<Schedule, 'scheduleId' | 'createUser'>) => {
  await calenderStore.createSchedule({ createUser: '', ...newSchedule }, calenderId)
  calenderStore.fetchCalender(calenderId)
}

const editSchedule = async (newSchedule: Schedule) => {
  if (!selectSchedule.value) return
  await calenderStore.updateSchedule(newSchedule, calenderId)
  calenderStore.fetchCalender(calenderId)
}

const deleteSchedule = async () => {
  if (!selectSchedule.value) return
  await calenderStore.removeSchedule(calenderId, selectSchedule.value.scheduleId)
  calenderStore.fetchCalender(calenderId)
}

const handleEventClick = (info: EventClickArg) => {
  info.jsEvent.preventDefault()
  const schedule = getScheduleFromId(info.event.id)
  if (!schedule) return
  selectSchedule.value = schedule
  isEditScheduleDialogOpen.value = true
}

const handleCreateScheduleButtonClick = () => {
  isCreateScheduleDialogOpen.value = true
}

const getScheduleFromId = (id: string) => {
  return calenderStore.calender?.schedules.find((e) => e.scheduleId === id)
}
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
  