import firebase from '@/firebase/firebase'
import type { Calendar } from '@/values/Calendar'
import type { Schedule } from '@/values/Schedule'
import 'firebase/compat/firestore'

class CalenderRepository {
  static async setCalender(calender: Omit<Calendar, 'calenderId'>) {
    try {
      const calenderRef = firebase.firestore().collection('calenders').doc()
      const calenderData = {
        ...calender,
        calenderId: calenderRef.id
      }
      const setCalenderData = {
        ...calender,
        calenderId: calenderRef.id,
        createdAt: firebase.firestore.Timestamp.fromDate(calender.createdAt),
        updatedAt: firebase.firestore.Timestamp.fromDate(calender.updatdAt)
      }
      await calenderRef.set(setCalenderData)
      return calenderData
    } catch (error) {
      console.error('Error adding document: ', error)
      throw error
    }
  }

  static async saveSchedule(schedule: Omit<Schedule, 'scheduleId'>, calenderId: string) {
    try {
      const calenderSubCollectionRef = firebase
        .firestore()
        .collection('calenders')
        .doc(calenderId)
        .collection('schedules')
        .doc()
        const {start, end, ...others} = schedule
      const scheduleData = {
        ...others,
        scheduleId: calenderSubCollectionRef.id,
        start: firebase.firestore.Timestamp.fromDate(start),
        end: firebase.firestore.Timestamp.fromDate(end)
      }

      await calenderSubCollectionRef.set(scheduleData)
    } catch (error) {
      console.error('Error adding document: ', error)
      throw error
    }
  }

  static async getCalender(calenderId: string) {
    try {
      const calenderDoc = await firebase.firestore().collection('calenders').doc(calenderId).get()
      const calenderData = calenderDoc.data()
      const allScheduleData = await this.#getAllSchedule(calenderId)

      return {
        ...calenderData,
        updatdAt: calenderData!.updatedAt.toDate(),
        createdAt: calenderData!.createdAt.toDate(),
        schedules: allScheduleData
      } as Calendar
    } catch (error) {
      console.error('Error adding document: ', error)
      throw error
    }
  }

  static async getAllCalenders() {
    try {
      const calendersQuery = await firebase.firestore().collection('calenders').get()
      const allCalendersData = await Promise.all(
        calendersQuery.docs.map(async (calender) => {
          const calenderData = calender.data()
          const calenderId = calenderData.calenderId
          const allScheduleData = await this.#getAllSchedule(calenderId)

          return {
            ...calenderData,
            updatdAt: calenderData.updatedAt.toDate(),
            createdAt: calenderData.createdAt.toDate(),
            schedules: allScheduleData
          } as Calendar
        })
      )

      return allCalendersData
    } catch (error) {
      console.error('Error adding document: ', error)
      throw error
    }
  }

  static async deleteSchedule(calenderId: string, scheduleId: string) {
    await firebase
      .firestore()
      .collection('calenders')
      .doc(calenderId)
      .collection('schedules')
      .doc(scheduleId)
      .delete()
  }

  static async #getAllSchedule(calenderId: string) {
    const scheduleQuerySnapshot = await firebase
      .firestore()
      .collection('calenders')
      .doc(calenderId)
      .collection('schedules')
      .get()
    const schedulesData = scheduleQuerySnapshot.docs.map((schedule) => {
      const scheduleData = schedule.data()
      if (scheduleData.start && scheduleData.end) {
        return {
          ...scheduleData,
          start: scheduleData.start.toDate(),
          end: scheduleData.end.toDate()
        }
      }
      return scheduleData
    })
    return schedulesData
  }
}

export default CalenderRepository
