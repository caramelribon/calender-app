import { defineStore } from 'pinia'
import CalenderRepository from '@/repository/calender'
import type { Calendar } from '@/values/Calendar'
import type { Schedule } from '@/values/Schedule'

export const useCalenderStore = defineStore('calender', {
  state: () => ({
    calender: undefined as Calendar | undefined,
    calenders: [] as Calendar[]
  }),
  getters: {
    getCalender(state) {
      return state.calender
    }
  },

  actions: {
    async createCalender(calender: Omit<Calendar, 'calenderId'>) {
      try {
        const calenderData = await CalenderRepository.setCalender(calender)
        this.calender = calenderData
      } catch (error) {
        console.error(error)
      }
    },
    async createSchedule(schedule: Omit<Schedule, 'scheduleId'>, calenderId: string) {
      try {
        await CalenderRepository.saveSchedule(schedule, calenderId)
      } catch (error) {
        console.error(error)
      }
    },
    async updateSchedule(schedule: Schedule, calenderId: string) {
      try {
        await CalenderRepository.updateSchedule(schedule, calenderId)
      } catch (error) {
        console.error(error)
      }
    },
    async fetchCalender(calenderId: string) {
      try {
        const calenderData = await CalenderRepository.getCalender(calenderId)
        this.calender = calenderData
        return calenderData
      } catch (error) {
        console.error(error)
      }
    },
    async fetchAllCalenders() {
      try {
        const allCalendersData = await CalenderRepository.getAllCalenders()
        this.calenders = allCalendersData
        console.log(allCalendersData)
      } catch (error) {
        console.error(error)
      }
    },
    async removeSchedule(calenderId: string, scheduleId: string) {
      try {
        await CalenderRepository.deleteSchedule(calenderId, scheduleId)
      } catch (error) {
        console.error(error)
      }
    }
  }
})
