import { defineStore } from 'pinia'
import CalenderRepository from '@/repository/calender'

export const useCalenderStore = defineStore('calender', {
  state: () => ({
    calender: {},
    calenders: []
  }),
  getters: {
    getCalender(state) {
      return state.calender
    }
  },

  actions: {
    async createCalender(calender) {
      try {
        const calenderData = await CalenderRepository.setCalender(calender)
        this.calender = calenderData
      } catch (error) {
        console.error(error)
      }
    },
    async saveSchedule(schedule, calenderId) {
      try {
        await CalenderRepository.saveSchedule(schedule, calenderId)
      } catch (error) {
        console.error(error)
      }
    },
    async fetchCalender(calenderId) {
      try {
        const calenderData = await CalenderRepository.getCalender(calenderId)
        this.calender = calenderData
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
    async removeSchedule(calenderId, scheduleId) {
      try {
        await CalenderRepository.deleteSchedule(calenderId, scheduleId)
      } catch (error) {
        console.error(error)
      }
    }
  }
})
