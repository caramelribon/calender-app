import type { Schedule } from '@/values/Schedule'
import type { EventInput } from '@fullcalendar/core'

export const scheduleToFcEvent = (customEvent: Schedule): EventInput => {
  const res: EventInput = {
    id: customEvent.scheduleId,
    title: customEvent.title,
    start: customEvent.start,
    end: customEvent.end,
    allDay: true,
    color: eventColorToFcColor(customEvent.color)
  }
  return res
}

const eventColorToFcColor = (color: number) => {
  switch (color) {
    case 0:
      return 'red'
    case 1:
      return 'green'
    case 2:
      return 'lightblue'
    default:
      return 'blue'
  }
}
