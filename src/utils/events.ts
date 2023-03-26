import type { Schedule } from '@/values/Schedule'
import type { EventInput } from '@fullcalendar/core'
import { getColorData } from './color'

export const scheduleToFcEvent = (customEvent: Schedule): EventInput => {
  const res: EventInput = {
    id: customEvent.scheduleId,
    title: customEvent.title,
    start: customEvent.start,
    end: customEvent.end,
    allDay: customEvent.all,
    color: eventColorToFcColor(customEvent.color)
  }
  return res
}

const eventColorToFcColor = (color: number) => {
  return getColorData(color)
}
