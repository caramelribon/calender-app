<template>
  <div class="calender-page" :style="`background-color: ${bgColor}`">
    <Header />
    <div class="main__contents">
      <template v-if="calenderStore.calender">
        <div class="calender-title">{{ calenderStore.calender.name }}</div>
        <div class="mt04 last-edit-group">
          <img src="/src/assets/time-icon.svg" class="calender-icon" alt="" />
          <div class="last-edit-date">最終編集時刻 {{ lastUpdatedAtStr }}</div>
        </div>
        <p class="mt16" style="word-wrap: break-word">{{ calenderStore.calender.description }}</p>
        <DefaultButton
          align="right"
          color="#D8EEFF"
          class="add-event-btn"
          @click="handleCreateScheduleButtonClick"
          >予定の追加</DefaultButton
        >
        <div style="background-color: white">
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
        </div>
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
import DefaultButton from '@/components/button/DefaultButton.vue'
import Header from '@/components/Header.vue'
import { getColorData } from '@/utils/color'

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

const bgColor = computed(() => {
  if (calenderStore.calender === undefined) {
    return '#8bd0ff'
  }
  return getColorData(calenderStore.calender?.color)
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
.main__contents {
  padding: 50px 50px;
}
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
.calender-title {
  font-size: 72px;
  font-weight: 900;
  color: var(--white);
  -webkit-text-stroke: 1px #000000;
}
.last-edit-group {
  display: flex;
  justify-content: end;
  align-content: center;
  gap: 10px;
}
.last-edit-date {
  text-align: end;
  font-weight: 100;
  color: var(--gray);
}
.add-event-btn {
  width: 250px;
  margin: 24px 0 24px auto;
}
</style>
