<template>
  <div class="main__contents">
    <div>{{ calender.name }}</div>
    <div>最終編集時刻 {{ lastUpdatedAtStr }}</div>
    <p style="word-wrap: break-word">{{ calender.description }}</p>
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
  </div>
</template>
  
  <script lang="ts">
import FullCalender from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import type { CalendarOptions, EventClickArg } from '@fullcalendar/core'
import { customEventToFcEvent, type CustomEvent } from '@/utils/events'

export default {
  components: {
    FullCalender
  },
  data() {
    return {
      defaultCalenderOptions: {
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
      },
      calender: {
        calenderId: '1',
        openState: 0,
        createdAt: '2023-01-01',
        updatedAt: '2023-02-01',
        lastUpdateUser: '1',
        createUser: '1',
        name: 'カレンダー01',
        description:
          'hogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehoge'
      },
      events: [
        {
          scheduleId: '1',
          title: 'event 1',
          start: '2023-03-01T00:00:00',
          end: '2023-03-01T10:00:00',
          color: 1
        },
        { scheduleId: '2', title: 'event 1', start: '2023-03-01', end: '2023-03-04' },
        { scheduleId: '3', title: 'event 1', start: '2023-03-01', end: '2023-03-04' },
        { scheduleId: '4', title: 'event 1', start: '2023-03-01', end: '2023-03-04' },
        { scheduleId: '5', title: 'event 1', start: '2023-03-01', end: '2023-03-04' },
        { scheduleId: '6', title: 'event 2', start: '2023-03-02', end: '2023-03-02' }
      ] as CustomEvent[]
    }
  },
  computed: {
    calenderOptions: function (): CalendarOptions {
      return {
        events: this.events.map(customEventToFcEvent),
        eventClick: this.handleEventClick,
        ...this.defaultCalenderOptions
      }
    },
    lastUpdatedAtStr: function () {
      const d = new Date(this.calender.updatedAt)
      return `${d.getFullYear()} / ${(d.getMonth() + 1).toString().padStart(2, '0')} / ${d
        .getDate()
        .toString()
        .padStart(2, '0')} ${d.getHours().toString().padStart(2, '0')}:${d
        .getMinutes()
        .toString()
        .padStart(2, '0')}`
    }
  },
  methods: {
    handleEventClick: function (info: EventClickArg) {
      info.jsEvent.preventDefault()
      const event = this.getEventFromId(info.event.id)
      if (!event) return
      event.color = 2
    },
    getEventFromId: function (id: string) {
      return this.events.find((e) => e.scheduleId === id)
    },
    addEvent: function () {
      this.events.push({
        scheduleId: '7',
        title: 'added event',
        start: '2023-03-10',
        end: '2023-03-11',
        color: 1,
        createUser: '',
        all: true
      })
    }
  }
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
  